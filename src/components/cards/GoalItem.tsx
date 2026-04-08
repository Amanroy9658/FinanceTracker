import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface GoalItemProps {
  title: string;
  target: number;
  current: number;
  icon: string;
}

export const GoalItem: React.FC<GoalItemProps> = ({ title, target, current }) => {
  const { theme } = useTheme();
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <View 
      className="p-5 rounded-3xl mb-4 border-[1px]" 
      style={{ backgroundColor: theme.card, borderColor: theme.border }}
    >
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</Text>
          <Text className="text-xl font-bold" style={{ color: theme.text }}>₹{current.toLocaleString()} <Text className="text-sm font-normal" style={{ color: theme.textSecondary }}>/ ₹{target.toLocaleString()}</Text></Text>
        </View>
        <View className="bg-green-500/10 px-3 py-1 rounded-full">
            <Text className="text-green-500 font-bold text-xs">{percentage.toFixed(0)}%</Text>
        </View>
      </View>

      <View className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: theme.surface }}>
        {/* Actual Progress */}
        <View 
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
};
