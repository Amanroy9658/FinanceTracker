import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface LoadingSpinnerProps extends ActivityIndicatorProps {
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen, 
  size = 'small', 
  color, 
  ...props 
}) => {
  const { theme } = useTheme();

  if (fullScreen) {
    return (
      <View 
        className="flex-1 justify-center items-center" 
        style={{ backgroundColor: theme.background }}
      >
        <ActivityIndicator 
          size="large" 
          color={color || theme.primary} 
          {...props} 
        />
      </View>
    );
  }

  return (
    <ActivityIndicator 
      size={size} 
      color={color || theme.primary} 
      {...props} 
    />
  );
};
