import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SpendingBarChartProps {
  current: number;
  total: number;
  label?: string;
}

export const SpendingBarChart: React.FC<SpendingBarChartProps> = ({ 
  current, 
  total,
  label = "April Spendings" 
}) => {
  const chartHeight = 160;
  
  const barData = [
    { height: 100, gradient: ['#4ade80', '#2dd4bf'] },
    { height: 140, gradient: ['#4ade80', '#2dd4bf'] },
    { height: 80, gradient: ['#4ade80', '#2dd4bf'] },
    { height: 120, gradient: ['#4ade80', '#2dd4bf'] },
    { height: 110, gradient: ['#4ade80', '#2dd4bf'] },
    { height: 90, gradient: ['#4ade80', '#2dd4bf'] },
  ];

  const { width } = useWindowDimensions();
  const barWidth = 32;

  return (
    <View className="mb-10 p-5 rounded-3xl" style={{ backgroundColor: '#0D0D0D' }}>
      <View className="flex-row items-end justify-between" style={{ height: chartHeight }}>
        <View className="mr-5 justify-between h-full py-1">
          <Text className="text-gray-600 text-[10px]">₹1000</Text>
          <Text className="text-gray-600 text-[10px]">₹500</Text>
          <Text className="text-gray-600 text-[10px]">₹200</Text>
          <Text className="text-gray-600 text-[10px]">₹0</Text>
        </View>
        
        {/* Bars */}
        <View className="flex-1 flex-row items-end justify-around">
          {barData.map((bar, i) => (
            <View key={i} className="items-center">
              <View 
                className="w-10 rounded-xl overflow-hidden" 
                style={{ height: bar.height, backgroundColor: '#1A1A1A' }}
              >
                <View 
                  className="w-full absolute bottom-0 rounded-xl"
                  style={{ height: bar.height * 0.7, backgroundColor: '#34d399', opacity: 0.8 }}
                >
                    <LinearGradient
                      colors={['#5eead4', '#2dd4bf', '#14b8a6']}
                      className="w-full h-full"
                    />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      {/* Legend / Margin */}
      <View className="mt-8 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-sm font-medium">Current margin: {label}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-[#818CF8] font-bold text-sm">
            ₹{current.toFixed(2)}
            <Text className="text-gray-600 font-normal"> / ₹{total.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
