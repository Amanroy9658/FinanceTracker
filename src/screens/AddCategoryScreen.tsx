import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/ui/Input';
import { Button } from '../components/buttons/Button';
import { useExpense } from '../context/ExpenseContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

const ICONS = ['cash', 'fast-food', 'bus', 'film', 'cart', 'medical', 'airplane', 'home', 'book', 'game-controller'];
const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6', '#EC4899', '#14B8A6', '#F97316'];

export const AddCategoryScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { addCategory } = useExpense();
  
  const [name, setName] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }
    
    addCategory({
      id: Date.now().toString(),
      name: name.trim(),
      type,
      color: selectedColor,
      icon: selectedIcon,
    });
    
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 justify-center">
            <Icon name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: theme.text }}>New Category</Text>
          <View className="w-10" />
        </View>

        <ScrollView 
          className="flex-1 px-5 pt-4" 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Type Toggle */}
          <View 
            className="flex-row rounded-full p-1 mb-6" 
            style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }}
          >
            <TouchableOpacity 
              onPress={() => setType('expense')}
              className="flex-1 py-3 rounded-full items-center"
              style={type === 'expense' ? { backgroundColor: theme.danger, elevation: 4, shadowColor: theme.danger, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}}
            >
              <Text className="font-lexendBold" style={{ color: type === 'expense' ? '#FFF' : theme.textSecondary }}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setType('income')}
              className="flex-1 py-3 rounded-full items-center"
              style={type === 'income' ? { backgroundColor: theme.success, elevation: 4, shadowColor: theme.success, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 } : {}}
            >
              <Text className="font-lexendBold" style={{ color: type === 'income' ? '#FFF' : theme.textSecondary }}>Income</Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <Input 
            label="Category Name" 
            placeholder="e.g. Gym, Salary, Groceries" 
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (error) setError('');
            }}
            error={error}
          />

          {/* Icon Selection */}
          <Text className="font-semibold mb-3 mt-4" style={{ color: theme.text }}>Select Icon</Text>
          <View className="flex-row flex-wrap gap-4 mb-6">
            {ICONS.map(icon => (
              <TouchableOpacity 
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                className={`w-14 h-14 rounded-2xl justify-center items-center border-2 ${selectedIcon === icon ? '' : 'border-transparent'}`}
                style={{ 
                  backgroundColor: theme.surface,
                  borderColor: selectedIcon === icon ? theme.text : 'transparent' 
                }}
              >
                <Icon name={icon} size={24} color={selectedIcon === icon ? theme.text : theme.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Color Selection */}
          <Text className="font-semibold mb-3" style={{ color: theme.text }}>Select Color</Text>
          <View className="flex-row flex-wrap gap-4 mb-10">
            {COLORS.map(color => (
              <TouchableOpacity 
                key={color}
                onPress={() => setSelectedColor(color)}
                className="w-12 h-12 rounded-full justify-center items-center"
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && (
                  <View className="w-4 h-4 bg-white rounded-full opacity-80" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Button title="Save Category" onPress={handleSave} />
          
          <View className="h-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
