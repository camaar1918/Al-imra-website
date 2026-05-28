import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('aiu_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('aiu_theme', theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
