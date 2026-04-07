import React, { createContext, useContext } from 'react';

// Forcing Dark Theme constants globally as requested by design
export const darkTheme = {
  background: '#0A0A0A',
  card: '#1D1B1B',
  text: '#FAFAFA',
  textSecondary: '#A3A3A3',
  primary: '#FAFAFA', 
  secondary: '#333333',
  success: '#69CDB9',
  danger: '#F87171',
  border: '#2A2A2A',
  surface: '#111111',
};

export type ThemeType = typeof darkTheme;

interface ThemeContextProps {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: darkTheme,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: darkTheme, isDark: true, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
