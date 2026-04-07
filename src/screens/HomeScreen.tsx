import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import { GradientCard } from '../components/cards/GradientCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { TransactionItem } from '../components/cards/TransactionItem';
import { EmptyState } from '../components/ui/EmptyState';
import { MonthPicker } from '../components/ui/MonthPicker';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const { transactions, categories, deleteTransaction } = useExpense();
  const navigation = useNavigation<any>();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === selectedMonth.getMonth() && 
             tDate.getFullYear() === selectedMonth.getFullYear();
    });
  }, [transactions, selectedMonth]);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0, exp = 0;
    filteredTransactions.forEach(t => {
      if (t.type === 'income') inc += t.amount;
      else exp += t.amount;
    });
    return { totalIncome: inc, totalExpense: exp, balance: inc - exp };
  }, [filteredTransactions]);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="px-5 pt-16">
        <Text className="text-3xl font-bold" style={{ color: theme.text }}>Summary Dashboard</Text>
        <Text className="text-base mt-1" style={{ color: theme.textSecondary }}>Track your progress</Text>
      </View>

      <MonthPicker 
        selectedDate={selectedMonth} 
        onChange={setSelectedMonth} 
      />

      <GradientCard colors={['#E3F5E1', '#7AD1B5']} style={{ marginHorizontal: 20 }}>
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

      {filteredTransactions.length === 0 ? (
        <EmptyState 
          title="No transactions found"
          description={`You have no entries for ${selectedMonth.toLocaleString('default', { month: 'long' })}.`}
          iconName="receipt-outline"
          actionLabel="Add Transaction"
          onAction={() => navigation.navigate('AddEntry')}
        />
      ) : (
        <View className="flex-1">
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionItem 
                item={item} 
                category={categories.find(c => c.id === item.categoryId)} 
                onDelete={(id) => deleteTransaction(id)} 
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};
