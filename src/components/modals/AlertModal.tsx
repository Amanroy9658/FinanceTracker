import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/ThemeContext';
import { Button } from '../buttons/Button';

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ 
  visible, 
  title, 
  message, 
  type = 'info', 
  onClose 
}) => {
  const { theme } = useTheme();

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return { name: 'checkmark-circle', color: theme.success };
      case 'error':
        return { name: 'alert-circle', color: theme.danger };
      default:
        return { name: 'information-circle', color: '#3B82F6' };
    }
  };

  const icon = getIconConfig();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/85 justify-center items-center px-6">
        <View 
          className="w-full max-w-[340px] bg-[#1D1B1B] border-[#2A2A2A] rounded-[32px] border-[1px] p-8 shadow-2xl items-center"
        >
          <View 
            className="w-20 h-20 rounded-full items-center justify-center mb-6"
            style={{ backgroundColor: icon.color + '20' }}
          >
            <Icon name={icon.name} size={44} color={icon.color} />
          </View>

          <Text className="text-white text-2xl font-bold mb-3 text-center">{title}</Text>
          <Text className="text-gray-400 text-base text-center mb-8 px-2">{message}</Text>

          <View className="w-full">
            <Button 
                title="Okay" 
                onPress={onClose} 
                style={{ backgroundColor: theme.primary }}
                textStyle={{ color: '#000' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
