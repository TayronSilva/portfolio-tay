import { Menu, X, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Header Component - Navegação Sidebar
 * Design: Minimalismo Técnico
 * - Sidebar fixa à esquerda em desktop
 * - Menu hambúrguer em mobile
 * - Navegação limpa e funcional
 */

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { label: 'Sobre', href: '#about' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Experiência', href: '#experience' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <>
      {/* Sidebar - Desktop */}
      <nav className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:bg-background md:border-r md:border-border md:flex md:flex-col md:p-8 md:z-40">
        <div className="mb-12">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Tayronne
            <span className="text-primary"> Silva</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Desenvolvedor Backend
            <br />
            Java & Spring Boot
          </p>
          <button
            onClick={toggleTheme}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-xs font-medium">{isDark ? 'Tema Claro' : 'Tema Escuro'}</span>
          </button>
        </div>

        <ul className="space-y-6 flex-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Mesquita, Rio de Janeiro
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/TayronSilva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tayronne-silva/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-background border-b border-border z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-serif text-lg font-bold text-foreground">
            Tayronne<span className="text-primary">Silva</span>
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="bg-card border-t border-border">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-foreground hover:bg-secondary hover:text-primary transition-colors border-b border-border last:border-b-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Spacer for mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
