import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { insertContactSubmission } from "./db";
import { sendContactEmail } from "./email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("Email inválido"),
          subject: z.string().min(1, "Assunto é obrigatório"),
          message: z.string().min(1, "Mensagem é obrigatória"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await insertContactSubmission({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          });
          
          // Enviar e-mail em paralelo (não trava a resposta do banco)
          sendContactEmail({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          }).catch(err => console.error("[Email Error]", err));

          return { success: true, message: "Mensagem enviada com sucesso" };
        } catch (error: any) {
          console.error("Error submitting contact form:", error);
          
          // Se for erro de banco não conectado, dar uma mensagem mais clara
          if (error.message === "Database not connected") {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Erro de conexão com o banco de dados. O desenvolvedor precisa verificar o whitelist de IP no MongoDB Atlas.",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro ao enviar mensagem. Tente novamente mais tarde.",
            cause: error,
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
