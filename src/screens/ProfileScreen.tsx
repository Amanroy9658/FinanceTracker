import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/ui/Input';
import { Button } from '../components/buttons/Button';

export const ProfileScreen = () => {
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-white rounded-xl justify-center items-center mr-3">
            <Text className="text-black font-bold text-lg">P</Text>
          </View>
          <Text className="text-white text-xl font-bold">PayU</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Icon name="search-outline" size={24} color="#FAFAFA" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={24} color="#FAFAFA" />
            <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full justify-center items-center">
              <Text className="text-white text-[10px] font-bold">2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
        {/* Profile Card / Row */}
        <View className="flex-row items-center mb-8">
          <View className="w-12 h-12 bg-white rounded-xl justify-center items-center mr-4">
            <Text className="text-black font-bold text-xl">P</Text>
          </View>
          <Text className="text-white text-xl font-bold">Alex yu</Text>
        </View>

        {/* Segmented Control */}
        <View className="flex-row bg-[#111111] border-[1px] border-[#2A2A2A] rounded-full p-1 mb-8">
          <TouchableOpacity 
            onPress={() => setMode('preview')}
            className={`flex-1 py-3 rounded-full items-center ${mode === 'preview' ? 'bg-white' : ''}`}
          >
            <Text className={`font-bold ${mode === 'preview' ? 'text-black' : 'text-[#A3A3A3]'}`}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setMode('edit')}
            className={`flex-1 py-3 rounded-full items-center ${mode === 'edit' ? 'bg-white' : ''}`}
          >
            <Text className={`font-bold ${mode === 'edit' ? 'text-black' : 'text-[#A3A3A3]'}`}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Content based on mode */}
        {mode === 'preview' ? (
          <View className="space-y-6">
            <View className="flex-row items-center">
              <Text className="text-[#FAFAFA] text-base mr-2">Total spendings:</Text>
              <View className="border border-green-500 px-1 py-0.5 rounded-sm bg-green-500/20">
                <Text className="text-white text-base font-bold">$2000</Text>
              </View>
            </View>

            <View className="flex-row items-center mt-6">
              <Text className="text-[#A3A3A3] text-base mr-2">Email :</Text>
              <Text className="text-white text-base">alex@gmail.com</Text>
            </View>

            <View className="flex-row items-center mt-6">
              <Text className="text-[#A3A3A3] text-base mr-2">Balance :</Text>
              <Text className="text-white text-base font-bold">$20000</Text>
            </View>
          </View>
        ) : (
          <View>
            <Input label="Full Name" placeholder="Enter your full name" defaultValue="Alex yu" />
            <Input label="Email" placeholder="Enter your email" defaultValue="alex@gmail.com" keyboardType="email-address" />
            <Input 
              label="Password" 
              placeholder="Create a password" 
              secureTextEntry 
              rightIcon={<Icon name="eye-outline" size={20} color="#A3A3A3" />}
            />
            <Input label="Confirm Password" placeholder="Confirm your password" secureTextEntry />
            
            <View className="mt-4">
              <Button title="Update Details" onPress={() => setMode('preview')} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
