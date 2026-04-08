import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import Animated, { 
  useAnimatedProps, 
  useSharedValue, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  'worklet';
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  'worklet';
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
};

interface GaugeChartProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  title?: string;
  subtitle?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  max, 
  size = 280, 
  strokeWidth = 18,
  title = "Average",
  subtitle = "Last Updated Now"
}) => {
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  const { theme } = useTheme();
  
  // Angle for semi-circle gaug
  const startAngle = -210;
  const endAngle = 30;
  const totalAngle = endAngle - startAngle;
  
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value / max, {
      duration: 1500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [value, max]);

  const backgroundPath = describeArc(centerX, centerY, radius, startAngle, endAngle);
  
  const animatedPathProps = useAnimatedProps(() => {
    const currentAngle = startAngle + (totalAngle * progress.value);
    const path = describeArc(centerX, centerY, radius, startAngle, currentAngle);
    return { d: path };
  });

  const animatedDotProps = useAnimatedProps(() => {
    const currentAngle = startAngle + (totalAngle * progress.value);
    const pos = polarToCartesian(centerX, centerY, radius, currentAngle);
    return {
      cx: pos.x,
      cy: pos.y
    };
  });


  return (
    <View className="items-center justify-center" style={{ width: size, height: size * 0.7 }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#22D3EE" />
            <Stop offset="33%" stopColor="#818CF8" />
            <Stop offset="66%" stopColor="#EC4899" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </LinearGradient>
        </Defs>
        
        {/* Background Track */}
        <Path
          d={backgroundPath}
          stroke={theme.border}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Progress Track */}
        <AnimatedPath
          animatedProps={animatedPathProps}
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        {/* Indicator Dot */}
        <AnimatedCircle
          animatedProps={animatedDotProps}
          r={strokeWidth / 2 - 2}
          fill={theme.text}
          stroke={theme.background}
          strokeWidth={2}
        />
      </Svg>
      
      <View className="absolute items-center top-[30%]">
        <Text className="text-7xl font-bold tracking-tighter" style={{ color: theme.text }}>{value}</Text>
        <View className="mt-4 items-center px-4 text-center">
            <Text className="text-base font-semibold text-center" style={{ color: theme.textSecondary }}>{title}</Text>
            <Text className="text-xs mt-1" style={{ color: theme.textSecondary }}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};
