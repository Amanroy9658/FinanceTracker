import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Transaction, Category } from '../../types';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { 
  FadeInRight, 
  Layout, 
  FadeOutLeft 
} from 'react-native-reanimated';

interface TransactionItemProps {
  item: Transaction;
  category?: Category;
  onDelete: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = React.memo(({ 
  item, 
  category, 
  onDelete 
}) => {
  const { theme } = useTheme();
  const isIncome = item.type === 'income';

  const renderRightActions = () => {
    return (
      <TouchableOpacity 
        onPress={() => onDelete(item.id)}
        className="bg-red-500 justify-center items-center w-20 rounded-3xl mb-3 ml-2"
      >
        <Icon name="trash-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View 
      entering={FadeInRight} 
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      <Swipeable
        renderRightActions={renderRightActions}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
      >
        <View 
          className="flex-row items-center p-4 rounded-3xl mb-3 border-[1px]"
          style={{ backgroundColor: theme.card, borderColor: theme.border }}
        >
          <View 
            className="w-11 h-11 rounded-full justify-center items-center font-bold" 
            style={{ backgroundColor: category?.color || theme.primary }}
          >
            <Icon name={category?.icon || 'cash'} size={20} color="#FFF" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-poppinsMedium" style={{ color: theme.text }}>
              {category?.name || 'Unknown'}
            </Text>
            <Text className="text-sm mt-1 font-poppins" style={{ color: theme.textSecondary }}>
              {item.note || 'No note'}
            </Text>
          </View>
          <View className="items-end mr-2">
            <Text className="text-base font-lexendBold" style={{ color: isIncome ? theme.success : theme.danger }}>
              {isIncome ? '+' : '-'}₹{item.amount.toFixed(2)}
            </Text>
            <Text className="text-[10px] mt-1 font-poppins" style={{ color: theme.textSecondary }}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </Swipeable>
    </Animated.View>
  );
});
