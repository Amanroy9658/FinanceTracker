import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { BalancesScreen } from '../screens/BalancesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopWidth: 0.53,
            borderTopColor: theme.border,
            elevation: 0,
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarIcon: ({ focused, color }) => {
            let iconName = 'home';
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            if (route.name === 'Balances') iconName = focused ? 'wallet' : 'wallet-outline';
            if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            return <Icon name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Balances" component={BalancesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('AddEntry')}
        className="absolute bottom-[90px] right-5 w-14 h-14 rounded-full justify-center items-center"
        style={{
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 5,
        }}
      >
        <Icon name="add" size={32} color={theme.background} />
      </TouchableOpacity>
    </View>
  );
};
