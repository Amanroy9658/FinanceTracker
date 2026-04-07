import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const StatisticsScreen = () => {
  const { theme } = useTheme();
  const { transactions, categories } = useExpense();

  const expenseData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    const grouped = expenses.reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return categories
      .filter(c => c.type === 'expense' && grouped[c.id])
      .map(c => ({
        ...c,
        amount: grouped[c.id],
        percentage: total > 0 ? (grouped[c.id] / total) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, categories]);

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: theme.background }}>
      <Text className="text-3xl font-bold px-5 pt-16" style={{ color: theme.text }}>Analytics</Text>
      <Text className="text-base px-5 mt-1 mb-5" style={{ color: theme.textSecondary }}>Where your money goes</Text>

      <View className="px-5 pb-24">
        {expenseData.length === 0 ? (
          <View className="items-center mt-12">
            <Text className="mt-5" style={{ color: theme.textSecondary }}>No expense data available.</Text>
          </View>
        ) : (
          expenseData.map((item, index) => (
            <Animated.View 
              entering={FadeInUp.delay(index * 100)}
              key={item.id} 
              className="p-4 rounded-xl border-[1px] mb-4"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <View className="flex-row justify-between mb-3">
                <Text className="text-base font-semibold" style={{ color: theme.text }}>{item.name}</Text>
                <Text className="text-base font-bold" style={{ color: theme.danger }}>${item.amount.toFixed(2)}</Text>
              </View>
              <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
                <View 
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color, width: `${item.percentage}%` }} 
                />
              </View>
            </Animated.View>
          ))
        )}
      </View>
    </ScrollView>
  );
};
