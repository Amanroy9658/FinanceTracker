import './global.css';
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { ExpenseProvider } from './src/context/ExpenseContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ExpenseProvider>
          <AppNavigator />
        </ExpenseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
