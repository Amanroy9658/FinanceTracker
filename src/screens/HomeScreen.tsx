import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import { GradientCard } from '../components/GradientCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Transaction } from '../types';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const { transactions, categories, deleteTransaction } = useExpense();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0, exp = 0;
    transactions.forEach(t => {
      if (t.type === 'income') inc += t.amount;
      else exp += t.amount;
    });
    return { totalIncome: inc, totalExpense: exp, balance: inc - exp };
  }, [transactions]);

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const category = categories.find(c => c.id === item.categoryId);
    const isIncome = item.type === 'income';

    return (
      <View 
        className="flex-row items-center p-4 rounded-2xl mb-3 border-[1px]"
        style={{ backgroundColor: theme.card, borderColor: theme.border }}
      >
        <View 
          className="w-11 h-11 rounded-full justify-center items-center" 
          style={{ backgroundColor: category?.color || theme.primary }}
        >
          <Icon name={category?.icon || 'cash'} size={20} color="#FFF" />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-base font-semibold" style={{ color: theme.text }}>
            {category?.name || 'Unknown'}
          </Text>
          <Text className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            {item.note || 'No note'}
          </Text>
        </View>
        <View className="items-end mr-3">
          <Text className="text-base font-bold" style={{ color: isIncome ? theme.success : theme.danger }}>
            {isIncome ? '+' : '-'}${item.amount.toFixed(2)}
          </Text>
          <Text className="text-xs mt-1" style={{ color: theme.textSecondary }}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => deleteTransaction(item.id)} className="p-1 justify-center items-center">
          <Icon name="trash-outline" size={20} color={theme.danger} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="px-5 pt-16">
        <Text className="text-3xl font-bold" style={{ color: theme.text }}>Summary Dashboard</Text>
        <Text className="text-base mt-1" style={{ color: theme.textSecondary }}>Track your progress</Text>
      </View>

      <GradientCard colors={['#E3F5E1', '#7AD1B5']} style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text className="text-black text-base font-medium opacity-70">Total Balance</Text>
        <Text className="text-black text-4xl font-bold my-2">${balance.toFixed(2)}</Text>
        <View className="flex-row justify-between mt-2">
          <View>
            <Text className="text-black text-sm font-medium opacity-70">Income</Text>
            <Text className="text-black text-lg font-bold">+${totalIncome.toFixed(2)}</Text>
          </View>
          <View>
            <Text className="text-black text-sm font-medium opacity-70">Expenses</Text>
            <Text className="text-black text-lg font-bold">-${totalExpense.toFixed(2)}</Text>
          </View>
        </View>
      </GradientCard>

      <View className="px-5 mt-8 mb-3">
        <Text className="text-xl font-bold" style={{ color: theme.text }}>Recent Transactions</Text>
      </View>

      {transactions.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-5">
          <Icon name="receipt-outline" size={50} color={theme.textSecondary} />
          <Text className="mt-3 text-base" style={{ color: theme.textSecondary }}>No transactions yet</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
