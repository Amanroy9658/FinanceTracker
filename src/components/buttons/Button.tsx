import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useTheme } from '../../theme/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle | any;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, textStyle, loading, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      className={`rounded-xl h-14 items-center justify-center mt-2 ${loading ? 'opacity-70' : ''}`}
      style={{ backgroundColor: theme.primary }}
      activeOpacity={0.8}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner color={theme.background} />
      ) : (
        <Text className="font-lexendBold text-lg" style={[{ color: theme.background }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
