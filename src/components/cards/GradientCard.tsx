import React from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle | ViewStyle[];
  colors?: (string | number)[];
}

export const GradientCard: React.FC<Props> = ({ 
  children, 
  className = "",
  style,
  colors = ['#4A00E0', '#8E2DE2'] 
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={`rounded-2xl p-5 shadow-lg shadow-black/10 elevation-5 ${className}`}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
