import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface EmptyStateProps {
  title: string;
  description: string;
  iconName: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  iconName,
  actionLabel,
  onAction,
}) => {
  const { theme } = useTheme();

  return (
    <Animated.View 
      entering={FadeInDown.duration(1000)}
      className="flex-1 justify-center items-center px-10"
    >
      <View 
        className="w-24 h-24 rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: theme.card }}
      >
        <Icon name={iconName} size={48} color={theme.textSecondary} />
      </View>
      <Text className="text-xl font-bold text-center mb-2" style={{ color: theme.text }}>
        {title}
      </Text>
      <Text className="text-sm text-center mb-8" style={{ color: theme.textSecondary }}>
        {description}
      </Text>
      
      {actionLabel && onAction && (
        <TouchableOpacity 
          onPress={onAction}
          className="px-8 py-4 rounded-2xl"
          style={{ backgroundColor: theme.primary }}
        >
          <Text className="font-bold text-base" style={{ color: theme.background }}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};
