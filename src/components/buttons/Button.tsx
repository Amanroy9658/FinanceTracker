import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle | any;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, textStyle, loading, ...props }) => {
  return (
    <TouchableOpacity 
      className={`bg-white rounded-xl h-14 items-center justify-center mt-2 ${loading ? 'opacity-70' : ''}`}
      activeOpacity={0.8}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner color="#000" />
      ) : (
        <Text className="text-black font-lexendBold text-lg" style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
