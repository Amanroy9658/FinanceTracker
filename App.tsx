import './global.css';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { ExpenseProvider, useExpense } from './src/context/ExpenseContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, useUser } from './src/context/UserContext';
import AppLoadingScreen from './src/screens/AppLoadingScreen';

// Internal component to handle data-driven loading logic
const AppContent = () => {
  const { isLoading: userLoading } = useUser();
  const { isLoading: expenseLoading } = useExpense();
  const [minTimeDone, setMinTimeDone] = useState(false);

  useEffect(() => {
    // Ensuring a minimum pleasant splash duration for branding
    const timer = setTimeout(() => {
      setMinTimeDone(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const isReady = !userLoading && !expenseLoading && minTimeDone;

  if (!isReady) {
    return <AppLoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <ExpenseProvider>
          <AppContent />
        </ExpenseProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
