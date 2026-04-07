import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface CurrencyCardProps {
  flag: string;
  code: string;
  name: string;
  isStarred?: boolean;
  onEnable?: () => void;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ 
  flag, 
  code, 
  name, 
  isStarred = false,
  onEnable 
}) => {
  const { theme } = useTheme();

  return (
    <View 
      className="p-4 rounded-3xl border mb-4 flex-row items-center justify-between"
      style={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A' }}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-[#2A2A2A] items-center justify-center mr-4">
          <Text className="text-2xl">{flag}</Text>
        </View>
        <View>
          <Text className="text-white text-lg font-bold">{code}</Text>
          <Text className="text-gray-400 text-sm">{name}</Text>
        </View>
      </View>
      
      <View className="flex-row items-center gap-x-4">
        <TouchableOpacity>
          <Icon name={isStarred ? "star" : "star-outline"} size={22} color={isStarred ? "#F59E0B" : "#4B5563"} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={onEnable}
          className="px-5 py-2 rounded-xl bg-[#2A2A2A]"
        >
          <Text className="text-white text-sm font-semibold">+ Enable</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
