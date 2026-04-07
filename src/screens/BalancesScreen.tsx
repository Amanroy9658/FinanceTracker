import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { GaugeChart } from '../components/ui/GaugeChart';
import { CurrencyCard } from '../components/ui/CurrencyCard';
import { SpendingBarChart } from '../components/ui/SpendingBarChart';
import { GoalItem } from '../components/cards/GoalItem';
import Animated, { FadeInUp } from 'react-native-reanimated';


export const BalancesScreen = () => {
  const { theme } = useTheme();
  const { transactions, stats } = useExpense();
  const { totalBalance, totalIncome, totalExpense, savingsRate, currentMonthExpense: currentMonthTotal } = stats;

  const savingsTitle = React.useMemo(() => {
    if (savingsRate > 70) return "Excellent Saving!";
    if (savingsRate > 40) return "Healthy Savings";
    if (savingsRate > 20) return "Average Saving";
    if (savingsRate > 0) return "Low Saving";
    return "Budget Exceeded!";
  }, [savingsRate]);

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View className="px-5 py-4 flex-row justify-between items-center bg-[#0A0A0A]/50">
        <View className="flex-row items-center">
            <View className="bg-white p-1 rounded-lg mr-3 w-8 h-8 items-center justify-center">
                <Text className="text-[#0A0A0A] font-lexendBold text-xl">L</Text>
            </View>
            <Text className="text-white text-xl font-lexendBold">Ledger</Text>
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
        <Animated.View entering={FadeInUp.delay(100)} className="mt-8 mb-10">
          <Text className="text-white text-3xl font-lexendBold">Your Balances</Text>
          <Text className="text-gray-500 text-base mt-2 font-poppins">Manage your multi-currency accounts</Text>
        </Animated.View>

        {/* Gauge Chart Section */}
        <Animated.View entering={FadeInUp.delay(200)} className="items-center py-5">
           <GaugeChart 
            value={Math.round(savingsRate)} 
            max={100} 
            title={savingsTitle}
            subtitle="Income vs Expenses Rate"
          />
        </Animated.View>

        {/* Available Currencies */}
        <Animated.View entering={FadeInUp.delay(300)} className="mt-8">
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-white text-xl font-bold">Available Currencies</Text>
            </View>
            
            <CurrencyCard 
                flag="🇮🇳" 
                code="INR" 
                name="Indian Rupee" 
                amount={totalBalance}
                isStarred 
            />
        </Animated.View>

        {/* Bar Chart Section */}
        <Animated.View entering={FadeInUp.delay(400)} className="mt-5 mb-8">
            <SpendingBarChart 
                current={currentMonthTotal} 
                total={10000} 
                label={`${new Date().toLocaleString('default', { month: 'long' })} Spendings`} 
            />
        </Animated.View>

        {/* FINANCIAL GOALS - PREMIUM FEATURE */}
        <Animated.View 
          entering={FadeInUp.delay(500)} 
          className="px-5 mb-8"
        >
          <Text className="text-white text-lg font-lexendBold mb-4">Financial Goals</Text>
          <GoalItem 
            title="Emergency Fund" 
            target={50000} 
            current={Math.max(0, totalBalance * 0.4)} 
            icon="shield"
          />
          <GoalItem 
            title="New Gadget" 
            target={15000} 
            current={Math.max(0, totalBalance * 0.1)} 
            icon="laptop"
          />
        </Animated.View>

        {/* REPORT DOWNLOAD - PREMIUM FEATURE */}
        <Animated.View 
          entering={FadeInUp.delay(600)} 
          className="px-5 mb-10"
        >
          <TouchableOpacity 
            className="flex-row items-center justify-center p-5 rounded-3xl"
            style={{ backgroundColor: theme.primary }}
            onPress={() => {
              alert("Report generated: Ledger_Statement.csv");
            }}
          >
            <Icon name="download-outline" size={24} color="#000" />
            <Text className="text-black text-lg font-lexendBold ml-2">Download Report (CSV)</Text>
          </TouchableOpacity>
          <Text className="text-gray-500 text-center text-xs mt-3 font-poppins">Professional monthly ledger export for your accountant</Text>
        </Animated.View>
      </ScrollView>

      {/* Note: The Floating Action Button (FAB) is already part of the BottomTabNavigator */}
    </SafeAreaView>
  );
};
