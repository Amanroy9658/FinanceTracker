import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { GaugeChart } from '../components/ui/GaugeChart';
import { CurrencyCard } from '../components/ui/CurrencyCard';
import { SpendingBarChart } from '../components/ui/SpendingBarChart';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const BalancesScreen = () => {
  const { theme } = useTheme();
  const { transactions } = useExpense();

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row justify-between items-center bg-[#0A0A0A]/50">
        <View className="flex-row items-center">
            <View className="bg-white p-1 rounded-lg mr-3 w-8 h-8 items-center justify-center">
                <Text className="text-[#0A0A0A] font-bold text-xl">P</Text>
            </View>
            <Text className="text-white text-xl font-bold">PayU</Text>
        </View>
        <View className="flex-row items-center gap-x-5">
            <TouchableOpacity>
                <Icon name="search-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity>
                <View className="relative">
                    <Icon name="notifications-outline" size={24} color="#FFF" />
                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center border-2 border-[#0A0A0A]">
                        <Text className="text-white text-[8px] font-bold">2</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Animated.View entering={FadeInUp.delay(100)} className="mt-8 mb-4">
          <Text className="text-white text-3xl font-bold">Your Balances</Text>
          <Text className="text-gray-500 text-base mt-2">Manage your multi-currency accounts</Text>
        </Animated.View>

        {/* Gauge Chart Section */}
        <Animated.View entering={FadeInUp.delay(200)} className="items-center py-5">
           <GaugeChart value={660} max={1000} />
        </Animated.View>

        {/* Available Currencies */}
        <Animated.View entering={FadeInUp.delay(300)} className="mt-8">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-white text-xl font-bold">Available Currencies</Text>
            </View>
            
            <CurrencyCard 
                flag="🇨🇦" 
                code="CAD" 
                name="Canadian Dollar" 
                isStarred 
            />
        </Animated.View>

        {/* Bar Chart Section */}
        <Animated.View entering={FadeInUp.delay(400)} className="mt-5 pb-32">
            <SpendingBarChart 
                current={350.00} 
                total={640.00} 
                label="April Spendings" 
            />
        </Animated.View>
      </ScrollView>

      {/* Note: The Floating Action Button (FAB) is already part of the BottomTabNavigator */}
    </SafeAreaView>
  );
};
