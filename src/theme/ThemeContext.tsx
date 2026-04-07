import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const lightTheme = {
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  primary: '#111827',
  secondary: '#E5E7EB',
  success: '#10B981',
  danger: '#EF4444',
  border: '#E5E7EB',
  surface: '#F3F4F6',
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (e) {
      console.error('Failed to load theme preference', e);
    }
  };

  const toggleTheme = async () => {
    try {
      const nextTheme = !isDark;
      setIsDark(nextTheme);
      await AsyncStorage.setItem('app_theme', nextTheme ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
