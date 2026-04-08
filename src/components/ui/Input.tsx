import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface InputProps extends TextInputProps {
  label: string;
  error?: string | null;
  touched?: boolean;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  touched, 
  rightIcon, 
  ...props 
}) => {
  const { theme } = useTheme();
  const showError = error && touched;

  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold mb-2 font-poppins" style={{ color: theme.text }}>{label}</Text>
      <View 
        className={`border-[1px] rounded-xl flex-row px-4 ${props.multiline ? 'py-2' : 'items-center h-14'}`}
        style={{ 
          backgroundColor: theme.surface, 
          borderColor: showError ? '#EF4444' : theme.border 
        }}
      >
        <TextInput 
          className="flex-1 text-base font-poppins"
          style={{ color: theme.text }}
          placeholderTextColor={theme.textSecondary}
          textAlignVertical="center"
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {showError && (
        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</Text>
      )}
    </View>
  );
};
