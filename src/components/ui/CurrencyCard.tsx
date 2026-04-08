import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface CurrencyCardProps {
  flag: string;
  code: string;
  name: string;
  amount: number;
  isStarred?: boolean;
  onPress?: () => void;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ 
  flag, 
  code, 
  name, 
  amount,
  isStarred = false,
  onPress 
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="p-5 rounded-3xl border mb-4 flex-row items-center justify-between"
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <View className="flex-row items-center">
        <View className="w-11 h-11 rounded-full items-center justify-center mr-4" style={{ backgroundColor: theme.surface }}>
          <Text className="text-2xl">{flag}</Text>
        </View>
        <View>
          <Text className="text-lg font-bold" style={{ color: theme.text }}>{code}</Text>
          <Text className="text-sm" style={{ color: theme.textSecondary }}>{name}</Text>
        </View>
      </View>
      
      <View className="items-end">
        <Text className="text-lg font-bold" style={{ color: theme.text }}>₹{amount.toFixed(2)}</Text>
        <Icon name={isStarred ? "star" : "star-outline"} size={18} color={isStarred ? "#F59E0B" : "#4B5563"} />
      </View>
    </TouchableOpacity>
  );
};
