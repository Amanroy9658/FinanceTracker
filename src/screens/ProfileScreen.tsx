import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/ui/Input';
import { Button } from '../components/buttons/Button';
import { useTheme } from '../theme/ThemeContext';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const { theme, isDark, toggleTheme } = useTheme();
  const { profile, updateProfile, logout } = useUser();
  const navigation = useNavigation<any>();
  
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);

  const handleUpdate = () => {
    updateProfile({ name: editName, email: editEmail });
    setMode('preview');
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-xl justify-center items-center mr-3" style={{ backgroundColor: theme.text }}>
            <Text className="font-lexendBold text-lg" style={{ color: theme.background }}>
              L
            </Text>
          </View>
          <Text className="text-xl font-lexendBold" style={{ color: theme.text }}>Ledge₹</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Icon name="search-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <View className="relative">
              <Icon name="notifications-outline" size={24} color={theme.text} />
              <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full justify-center items-center border-[1px]" style={{ borderColor: theme.background }}>
                <Text className="text-white text-[8px] font-bold">2</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
        {/* Profile Card  */}
        <View className="flex-row items-center justify-between mb-8">
            <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-xl justify-center items-center mr-4" style={{ backgroundColor: theme.text }}>
                    <Text className="font-lexendBold text-xl" style={{ color: theme.background }}>
                      {profile.name ? profile.name.charAt(0).toLowerCase() : 's'}
                    </Text>
                </View>
                <Text className="text-xl font-lexendBold" style={{ color: theme.text }}>{profile.name}</Text>
            </View>
        </View>

        {/* Settings Section */}
        <View className="mb-8 p-4 rounded-3xl" style={{ backgroundColor: theme.card }}>
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: theme.surface }}>
                        <Icon name={isDark ? "moon" : "sunny"} size={20} color={theme.text} />
                    </View>
                    <Text className="text-base font-semibold" style={{ color: theme.text }}>Dark Mode</Text>
                </View>
                <Switch 
                    value={isDark} 
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: theme.success }}
                    thumbColor={Platform.OS === 'ios' ? undefined : '#f4f3f4'}
                />
            </View>
        </View>

        {/* Segmented Control */}
        <View 
          className="flex-row rounded-full p-1 mb-8" 
          style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }}
        >
          <TouchableOpacity 
            onPress={() => setMode('preview')}
            className="flex-1 py-3 rounded-full items-center"
            style={mode === 'preview' ? { 
              backgroundColor: theme.card,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            } : {}}
          >
            <Text className="font-bold" style={{ color: mode === 'preview' ? theme.text : theme.textSecondary }}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              setEditName(profile.name);
              setEditEmail(profile.email);
              setMode('edit');
            }}
            className="flex-1 py-3 rounded-full items-center"
            style={mode === 'edit' ? { 
              backgroundColor: theme.card,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            } : {}}
          >
            <Text className="font-bold" style={{ color: mode === 'edit' ? theme.text : theme.textSecondary }}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Content based on mode */}
        {mode === 'preview' ? (
          <View className="space-y-6">
            <View className="flex-row items-center">
              <Text className="text-base mr-2 font-poppins" style={{ color: theme.textSecondary }}>Total spendings:</Text>
              <View className="px-2 py-1 rounded-lg" style={{ backgroundColor: theme.success + '20' }}>
                <Text className="text-base font-lexendBold" style={{ color: theme.success }}>₹2,000</Text>
              </View>
            </View>

            <View className="flex-row items-center mt-6">
              <Text className="text-base mr-2 font-poppins" style={{ color: theme.textSecondary }}>Email :</Text>
              <Text className="text-base font-poppinsMedium" style={{ color: theme.text }}>{profile.email}</Text>
            </View>

            <View className="flex-row items-center mt-6">
              <Text className="text-base mr-2 font-poppins" style={{ color: theme.textSecondary }}>Balance :</Text>
              <Text className="text-base font-lexendBold" style={{ color: theme.text }}>₹20,000</Text>
            </View>
          </View>
        ) : (
          <View>
            <Input 
              label="Full Name" 
              placeholder="Enter your full name" 
              value={editName}
              onChangeText={setEditName}
            />
            <Input 
              label="Email" 
              placeholder="Enter your email" 
              keyboardType="email-address" 
              value={editEmail}
              onChangeText={setEditEmail}
            />
            
            <View className="mt-4">
              <Button title="Update Details" onPress={handleUpdate} />
            </View>
          </View>
        )}

        {/* Logout Section */}
        <View className="mt-12">
            <Button 
                title="Logout Account" 
                onPress={handleLogout} 
                style={{ backgroundColor: theme.danger + '20' }}
                textStyle={{ color: theme.danger }}
            />
            <Text className="text-center text-gray-500 text-xs mt-4">Version 1.0.0 • Ledger App</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
