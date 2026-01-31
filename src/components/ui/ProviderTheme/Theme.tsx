import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

// 3. Crear el proveedor
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Persistencia: cargar tema guardado o default light
    return (localStorage.getItem('app-theme') as Theme) || 'light';
  });

  useEffect(() => {
    // Aplicar clase al body y guardar preferencia
    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};