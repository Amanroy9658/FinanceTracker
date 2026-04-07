import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle | any;
}

export const Button: React.FC<ButtonProps> = ({ title, textStyle, ...props }) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-xl h-14 items-center justify-center mt-2"
      activeOpacity={0.8}
      {...props}
    >
      <Text className="text-black font-bold text-lg" style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
