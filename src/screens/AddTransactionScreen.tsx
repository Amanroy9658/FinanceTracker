import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

export const AddTransactionScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { categories, addTransaction } = useExpense();
  
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter(c => c.type === type);

  React.useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find(c => c.id === selectedCategory)) {
      setSelectedCategory(filteredCategories[0].id);
    }
  }, [type, filteredCategories]);

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Invalid Amount', 'Please enter a valid number.');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Missing Category', 'Please select a category.');
      return;
    }

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      categoryId: selectedCategory,
      date: new Date().toISOString(),
      note,
    });

    setAmount('');
    setNote('');
    navigation.navigate('Home');
  };

  return (
    <KeyboardAwareScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}
    >
      <Text className="text-3xl font-bold mb-5" style={{ color: theme.text }}>Add Entry</Text>

      {/* Type Toggle */}
      <View className="flex-row rounded-xl p-1 mb-5" style={{ backgroundColor: theme.border }}>
        <TouchableOpacity 
          className="flex-1 py-3 items-center rounded-lg"
          style={type === 'expense' && { backgroundColor: theme.danger }}
          onPress={() => setType('expense')}
        >
          <Text className="font-bold text-base" style={type === 'expense' && { color: '#FFF' }}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 py-3 items-center rounded-lg"
          style={type === 'income' && { backgroundColor: theme.success }}
          onPress={() => setType('income')}
        >
          <Text className="font-bold text-base" style={type === 'income' && { color: '#FFF' }}>Income</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm font-semibold mb-2 mt-2" style={{ color: theme.textSecondary }}>Amount</Text>
      <TextInput
        className="border-[1px] rounded-xl px-4 py-3 text-lg mb-4"
        style={{ backgroundColor: theme.card, color: theme.text, borderColor: theme.border }}
        placeholder="0.00"
        placeholderTextColor={theme.textSecondary}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text className="text-sm font-semibold mb-2 mt-2" style={{ color: theme.textSecondary }}>Category</Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {filteredCategories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity 
              key={cat.id} 
              className="w-[48%] p-4 rounded-xl border-[1px] items-center mb-3"
              style={{ backgroundColor: theme.card, borderColor: isSelected ? cat.color : theme.border }}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Icon name={cat.icon} size={24} color={cat.color} />
              <Text className={`mt-2 text-sm ${isSelected ? 'font-bold' : ''}`} style={{ color: theme.text }}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text className="text-sm font-semibold mb-2 mt-2" style={{ color: theme.textSecondary }}>Note (Optional)</Text>
      <TextInput
        className="border-[1px] rounded-xl px-4 py-3 text-lg mb-4 h-20"
        style={{ backgroundColor: theme.card, color: theme.text, borderColor: theme.border }}
        placeholder="What was this for?"
        placeholderTextColor={theme.textSecondary}
        multiline
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity 
        className="p-4 rounded-xl items-center mt-5"
        style={{ backgroundColor: theme.primary }}
        onPress={handleSave}
      >
        <Text className="text-white text-lg font-bold">Save Entry</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};
