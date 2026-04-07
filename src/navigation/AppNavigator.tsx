import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AddTransactionScreen } from '../screens/AddTransactionScreen';
import { AddCategoryScreen } from '../screens/AddCategoryScreen';
import { AuthScreen } from '../screens/AuthScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="AddEntry" component={AddTransactionScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
