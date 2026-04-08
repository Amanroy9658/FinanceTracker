import React from 'react';
import { View, ViewStyle } from 'react-native';
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
    <View 
      className={`rounded-[28px] overflow-hidden shadow-xl shadow-black/20 elevation-8 ${className}`}
      style={style}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6"
      >
        {children}
      </LinearGradient>
    </View>
  );
};
