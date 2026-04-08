import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useExpense } from '../context/ExpenseContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';
import { validateAmount, validateRequired } from '../utils/validators';
import { Input } from '../components/ui/Input';

export const AddTransactionScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { categories, addTransaction } = useExpense();
  
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const filteredCategories = categories.filter(c => c.type === type);

  const validationSchema = useMemo(() => ({
    amount: (val: string) => validateAmount(val),
    categoryId: (val: string) => validateRequired(val, 'Category'),
    date: (val: string) => validateRequired(val, 'Date'),
    note: () => null,
  }), []);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setValues } = useForm(
    { 
      amount: '', 
      categoryId: filteredCategories[0]?.id || '', 
      date: new Date().toISOString().split('T')[0], 
      note: '' 
    },
    validationSchema,
    (formValues) => {
      addTransaction({
        id: Date.now().toString(),
        type,
        amount: parseFloat(formValues.amount),
        categoryId: formValues.categoryId,
        date: formValues.date,
        note: formValues.note,
      });
      navigation.goBack();
    }
  );

  // Update category when type changes if current category is not in the new list
  React.useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find(c => c.id === values.categoryId)) {
      handleChange('categoryId', filteredCategories[0].id);
    }
  }, [type, filteredCategories]);

  // SMART CATEGORY PREDICTION 
  React.useEffect(() => {
    if (!values.note) return;

    const keywords: { [key: string]: string[] } = {
      'Food': ['pizza', 'burger', 'zomato', 'swiggy', 'dinner', 'lunch', 'restaurant', 'coffee', 'starbucks', 'maggi'],
      'Transport': ['uber', 'ola', 'petrol', 'fuel', 'bus', 'train', 'metro', 'auto', 'taxi', 'parking'],
      'Entertainment': ['netflix', 'movie', 'cinema', 'game', 'spotify', 'party', 'concert', 'club'],
      'Salary': ['salary', 'bonus', 'dividend', 'interest', 'refund']
    };

    const lowercaseNote = values.note.toLowerCase();
    
    for (const [catName, words] of Object.entries(keywords)) {
      if (words.some(word => lowercaseNote.includes(word))) {
        const foundCategory = categories.find(c => c.name === catName);
        if (foundCategory && foundCategory.id !== values.categoryId) {
          handleChange('categoryId', foundCategory.id);
          break;
        }
      }
    }
  }, [values.note]);

  return (
    <KeyboardAwareScrollView 
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}
    >
      <Text className="text-3xl font-lexendBold mb-5" style={{ color: theme.text }}>Add Entry</Text>

      {/* Type Toggle */}
      <View className="flex-row rounded-xl p-1 mb-8" style={{ backgroundColor: theme.border }}>
        <TouchableOpacity 
          className="flex-1 py-3 items-center rounded-lg"
          style={type === 'expense' ? { backgroundColor: theme.danger } : {}}
          onPress={() => setType('expense')}
        >
          <Text className="font-lexendBold text-base" style={{ color: type === 'expense' ? '#FFF' : theme.textSecondary }}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 py-3 items-center rounded-lg"
          style={type === 'income' ? { backgroundColor: theme.success } : {}}
          onPress={() => setType('income')}
        >
          <Text className="font-lexendBold text-base" style={{ color: type === 'income' ? '#FFF' : theme.textSecondary }}>Income</Text>
        </TouchableOpacity>
      </View>

      <Input 
        label="Amount"
        placeholder="0.00"
        keyboardType="numeric"
        value={values.amount}
        onChangeText={(val) => handleChange('amount', val)}
        onBlur={() => handleBlur('amount')}
        error={errors.amount}
        touched={touched.amount}
      />

      <Input 
        label="Date"
        placeholder="MM/DD/YYYY"
        value={values.date}
        onChangeText={(val) => handleChange('date', val)}
        onBlur={() => handleBlur('date')}
        error={errors.date}
        touched={touched.date}
      />

      <Text className="text-sm font-semibold mb-3 mt-2" style={{ color: theme.textSecondary }}>Category</Text>
      <View className="flex-row flex-wrap justify-between mb-2">
        {filteredCategories.map(cat => {
          const isSelected = values.categoryId === cat.id;
          return (
            <TouchableOpacity 
              key={cat.id} 
              className="w-[48%] p-4 rounded-xl border-[1px] items-center mb-3"
              style={{ backgroundColor: theme.card, borderColor: isSelected ? cat.color : theme.border }}
              onPress={() => handleChange('categoryId', cat.id)}
            >
              <Icon name={cat.icon} size={24} color={cat.color} />
              <Text className={`mt-2 text-sm ${isSelected ? 'font-lexendBold' : 'font-poppins'}`} style={{ color: theme.text }}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        {/* Add New Category Button */}
        <TouchableOpacity 
          className="w-[48%] p-4 rounded-xl border-[1px] border-dashed items-center justify-center mb-3"
          style={{ backgroundColor: theme.card, borderColor: theme.textSecondary }}
          onPress={() => navigation.navigate('AddCategory')}
        >
          <Icon name="add-circle-outline" size={24} color={theme.textSecondary} />
          <Text className="mt-2 text-sm font-semibold" style={{ color: theme.textSecondary }}>
            Add New
          </Text>
        </TouchableOpacity>
      </View>
      {errors.categoryId && touched.categoryId && (
        <Text className="text-red-500 text-xs mb-4 ml-1">{errors.categoryId}</Text>
      )}

      <Input 
        label="Note (Optional)"
        placeholder="What was this for?"
        multiline
        style={{ height: 40 }}
        value={values.note}
        onChangeText={(val) => handleChange('note', val)}
      />

      <TouchableOpacity 
        className="p-5 rounded-2xl items-center mt-8"
        style={{ backgroundColor: theme.primary }}
        onPress={handleSubmit}
      >
        <Text className="text-lg font-lexendBold" style={{ color: theme.background }}>Save Entry</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};
