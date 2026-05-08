export const ENV = {
  appId: process.env.VITE_APP_ID ?? "tayronne-portfolio",
  cookieSecret: process.env.JWT_SECRET ?? "default-secret-change-me",
  databaseUrl: process.env.DATABASE_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT || "3000"),
};
