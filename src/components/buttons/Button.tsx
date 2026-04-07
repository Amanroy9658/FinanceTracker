import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-xl h-14 items-center justify-center mt-2"
      {...props}
    >
      <Text className="text-black font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};
