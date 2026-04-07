import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, rightIcon, ...props }) => {
  return (
    <View className="mb-4">
      <Text className="text-white text-sm font-semibold mb-2">{label}</Text>
      <View className="bg-[#111111] border-[1px] border-[#2A2A2A] rounded-xl flex-row items-center px-4 h-14">
        <TextInput 
          className="flex-1 text-white text-base"
          placeholderTextColor="#A3A3A3"
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
    </View>
  );
};
