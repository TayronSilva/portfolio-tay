import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Database, GitBranch, Zap, Mail } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

/**
 * Home Page - Portfólio Principal
 * Design: Minimalismo Técnico com Profundidade
 * Seções: Hero, Sobre, Habilidades, Projetos, Experiência, Contato
 */

export default function Home() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContactMutation = trpc.contact.submit.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      
      toast.success('Mensagem enviada com sucesso! Obrigado pelo contato.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main content - Offset para sidebar no desktop */}
      <main className="md:ml-64">
        {/* Hero Section */}
        <section id="hero" className="hero-section pt-20 md:pt-0 px-4 md:px-12 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
          </div>

          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="space-y-6 md:space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                Available for New Challenges
              </div>
              <div>
                <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight tracking-tighter">
                  Desenvolvedor
                  <br />
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    Backend Java
                  </span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
                Arquitetando sistemas de alta performance com <span className="text-foreground font-semibold">Spring Boot</span>, 
                mensageria distribuída e infraestrutura moderna.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <a href="#projects" className="inline-block">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto h-12 px-8 text-lg rounded-xl">
                    Ver Projetos <ArrowRight className="w-5 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#contact" className="inline-block">
                  <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-lg rounded-xl border-white/10 hover:bg-white/5 backdrop-blur-sm">
                    Entrar em Contato
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 px-4 md:px-12 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12">Sobre Mim</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sou um desenvolvedor backend apaixonado por criar soluções robustas e escaláveis. 
                  Com formação técnica em Informática pelo CEFET/RJ, tenho experiência prática em 
                  desenvolvimento de sistemas que resolvem problemas reais.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Minha trajetória inclui projetos complexos como o TransVeículos (gestão de frotas) 
                  e Vantage E-commerce (integração com Mercado Pago). Atualmente atuo como Project Lead 
                  na Comunidade Juninhos, auxiliando na organização técnica de squads e arquitetura de aplicações.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sou especialista em Java e Spring Boot, mas também tenho experiência com full-stack 
                  development usando NestJS e React. Minha visão analítica sobre processos e regras de 
                  negócio, adquirida na área administrativa pública, fortalece meu desenvolvimento de software.
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663581450166/UyjFfvuc4YfzbcKzAn6Yxh/java-spring-hero-KmD2Jp7edx7oLbEV9DCpS6.webp"
                  alt="Java e Spring Boot"
                  className="w-full max-w-sm rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 px-4 md:px-12 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12">Habilidades</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Backend */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-xl font-bold">Backend</h3>
                </div>
                <div className="space-y-3">
                  {['Java 17/21', 'Spring Boot 3', 'Spring Security', 'JPA / Hibernate', 'Arquitetura REST'].map((skill) => (
                    <div key={skill} className="skill-badge">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-xl font-bold">Banco de Dados</h3>
                </div>
                <div className="space-y-3">
                  {['PostgreSQL', 'MySQL', 'Prisma ORM', 'Modelagem Relacional'].map((skill) => (
                    <div key={skill} className="skill-badge">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Others */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-xl font-bold">Ferramentas</h3>
                </div>
                <div className="space-y-3">
                  {['Git & GitHub', 'Docker', 'Kubernetes', 'React.js', 'TypeScript'].map((skill) => (
                    <div key={skill} className="skill-badge">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Skills */}
            <div className="bg-background rounded-lg p-8 border border-border">
              <h3 className="font-serif text-lg font-bold mb-4">Competências Adicionais</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Liderança Técnica',
                  'Gestão de Equipes',
                  'Arquitetura de Sistemas',
                  'Implantação de Sistemas',
                  'Análise de Dados Fiscais',
                  'Gestão de Fluxo de Processos',
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-32 px-4 md:px-12 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12">Projetos Destacados</h2>

            <div className="space-y-8">
              {/* TransVeículos */}
              <div className="project-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">TransVeículos</h3>
                    <p className="text-muted-foreground mt-1">Sistema de Gestão de Frotas</p>
                  </div>
                  <a
                    href="https://github.com/TayronSilva/TransVeiculos-Legacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <GitBranch className="w-4 h-4" />
                    GitHub
                  </a>
                </div>

                <p className="text-muted-foreground mb-4">
                  Sistema completo de gestão de frotas desenvolvido com Java, Spring Boot, MySQL e Spring Security. 
                  Responsável pela modelagem do banco de dados, implementação de autenticação, controle de documentos 
                  veiculares, gerenciamento logístico e construção de dashboards operacionais.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'MySQL', 'Spring Security', 'REST API'].map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vantage E-commerce */}
              <div className="project-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">Vantage E-commerce</h3>
                    <p className="text-muted-foreground mt-1">Plataforma de E-commerce Full-Stack</p>
                  </div>
                  <a
                    href="https://github.com/TayronSilva/vantage-ecommerce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <GitBranch className="w-4 h-4" />
                    GitHub
                  </a>
                </div>

                <p className="text-muted-foreground mb-4">
                  Aplicação full-stack em arquitetura monorepo com NestJS + React. Integração real com Mercado Pago 
                  (PIX, cartão e boleto), autenticação JWT, painel administrativo completo e gerenciamento de estoque 
                  utilizando Prisma ORM e PostgreSQL.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['NestJS', 'React', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Mercado Pago'].map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bode Code */}
              <div className="project-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">Bode Code</h3>
                    <p className="text-muted-foreground mt-1">Projeto de Educação em Desenvolvimento</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  Projeto desenvolvido durante a formação técnica no CEFET/RJ. Atuei como desenvolvedor Backend, 
                  participando da modelagem de banco de dados, integração de sistemas e estruturação da lógica 
                  da aplicação. Apresentado na SEPEX (Semana de Pesquisa e Extensão) por dois anos consecutivos.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Java', 'Backend Development', 'Database Design'].map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-32 px-4 md:px-12 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12">Experiência</h2>

            <div className="space-y-8">
              {/* Current Role */}
              <div className="border-l-4 border-primary pl-6 pb-8">
                <h3 className="font-serif text-xl font-bold text-foreground">Líder de Projetos</h3>
                <p className="text-primary font-semibold">Comunidade Juninhos</p>
                <p className="text-muted-foreground text-sm mt-1">Desde Abril de 2026 • Remoto</p>
                <p className="text-muted-foreground mt-4">
                  Auxiliando na organização técnica de squads, versionamento com GitHub, colaboração em projetos 
                  práticos e suporte em deploy e arquitetura de aplicações.
                </p>
              </div>

              {/* Consultant Role */}
              <div className="border-l-4 border-muted pl-6 pb-8">
                <h3 className="font-serif text-xl font-bold text-foreground">Consultor Financeiro</h3>
                <p className="text-muted-foreground font-semibold">Autônomo</p>
                <p className="text-muted-foreground text-sm mt-1">Desde Fevereiro de 2025 • Nilópolis, RJ</p>
                <p className="text-muted-foreground mt-4">
                  Consultoria em análise de dados fiscais e gestão de processos financeiros.
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="mt-12 pt-12 border-t border-border">
              <h3 className="font-serif text-2xl font-bold mb-6">Formação</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-foreground">Ensino Técnico em Informática</h4>
                  <p className="text-primary font-semibold">CEFET/RJ - Centro Federal de Educação Tecnológica Celso Suckow da Fonseca</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Participante ativo da SEPEX por dois anos consecutivos, apresentando projetos voltados ao 
                    desenvolvimento de software. Desenvolveu um sistema de Almoxarifado Hospitalar em Java/Swing 
                    com gestão de estoque e geração automatizada de notas fiscais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 px-4 md:px-12 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-center">Vamos Conversar?</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-center">
              Estou aberto a oportunidades como Desenvolvedor Backend Java ou Full-Stack. 
              Envie uma mensagem através do formulário abaixo ou entre em contato pelos canais de comunicação.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-lg border border-border p-8">
                <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-primary" />
                  Enviar Mensagem
                </h3>

                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Assunto da mensagem"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Sua mensagem aqui..."
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-card rounded-lg border border-border p-8">
                  <h3 className="font-serif text-2xl font-bold mb-6">Informações de Contato</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Localização</p>
                      <p className="text-foreground font-medium">Mesquita, Rio de Janeiro • Brasil</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Disponibilidade</p>
                      <p className="text-foreground font-medium">Trabalho remoto • Disponível para oportunidades</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-4">Redes Profissionais</p>
                      <div className="flex flex-col gap-3">
                        <a
                          href="https://www.linkedin.com/in/tayronne-silva/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://github.com/TayronSilva"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary rounded-lg border border-border p-8">
                  <h3 className="font-serif text-lg font-bold mb-3 text-foreground">Tempo de Resposta</h3>
                  <p className="text-muted-foreground">
                    Respondo mensagens dentro de 24 horas. Obrigado por entrar em contato!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 md:px-12 border-t border-border bg-card">
          <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm">
            <p>© 2026 Tayronne Silva. Todos os direitos reservados.</p>
            <p className="mt-2 italic">
              "Code is like humor. When you have to explain it, it's bad." – Cory House
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
