import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface MonthPickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({ selectedDate, onChange }) => {
  const { theme } = useTheme();
  
  const generateMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = 6; i >= -1; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(d);
    }
    return months;
  };

  const months = generateMonths();

  return (
    <View className="mb-4 mt-2">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {months.map((date, index) => {
          const isSelected = 
            date.getMonth() === selectedDate.getMonth() && 
            date.getFullYear() === selectedDate.getFullYear();
            
          const monthName = date.toLocaleString('default', { month: 'short' });
          const yearNum = date.getFullYear().toString().slice(-2);
          
          return (
            <TouchableOpacity 
              key={index}
              onPress={() => onChange(date)}
              className="px-4 py-2 rounded-full border-[1px]"
              style={{
                backgroundColor: isSelected ? theme.text : theme.surface,
                borderColor: isSelected ? theme.text : theme.border
              }}
            >
              <Text 
                className={`font-semibold ${isSelected ? 'text-xl' : 'text-sm'}`}
                style={{ color: isSelected ? theme.background : theme.textSecondary }}
              >
                {monthName} {yearNum}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
