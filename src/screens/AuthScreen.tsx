import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/ui/Input';
import { Button } from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../hooks/useForm';
import { validateEmail, validatePassword, validateRequired } from '../utils/validators';

export const AuthScreen = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigation = useNavigation<any>();

  const validationSchema = useMemo(() => ({
    email: (val: string) => validateEmail(val),
    password: (val: string) => validatePassword(val),
    ...(mode === 'signup' ? {
      fullName: (val: string) => validateRequired(val, 'Full Name'),
      confirmPassword: (val: string, formValues: any) => {
        if (!val) return 'Confirm Password is required';
        if (val !== formValues.password) return 'Passwords do not match';
        return null;
      }
    } : {})
  }), [mode]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { fullName: '', email: '', password: '', confirmPassword: '' },
    validationSchema,
    () => {
      navigation.replace('MainTabs');
    }
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60 }} keyboardShouldPersistTaps="handled">
        {/* Logo / Header */}
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-white rounded-2xl justify-center items-center mb-6">
            <Text className="text-black font-bold text-3xl">L</Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-2">Welcome to Ledger</Text>
          <Text className="text-[#A3A3A3] text-center px-4">Send money globally with the real exchange rate</Text>
        </View>

        {/* Auth Card */}
        <View className="bg-[#1D1B1B] rounded-3xl p-6 shadow-lg m-2 mt-4 pb-8 border border-[#2A2A2A]">
          <Text className="text-white text-xl font-bold mb-2">Get started</Text>
          <Text className="text-[#A3A3A3] text-sm mb-6">Sign in to your account or create a new one</Text>

          {/* Segmented Control */}
          <View className="flex-row bg-[#111111] border-[1px] border-[#2A2A2A] rounded-full p-1 mb-6">
            <TouchableOpacity 
              onPress={() => setMode('signin')}
              className={`flex-1 py-3 rounded-full items-center ${mode === 'signin' ? 'bg-[#2A2A2A]' : ''}`}
            >
              <Text className={`font-bold ${mode === 'signin' ? 'text-white' : 'text-[#A3A3A3]'}`}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setMode('signup')}
              className={`flex-1 py-3 rounded-full items-center ${mode === 'signup' ? 'bg-[#2A2A2A]' : ''}`}
            >
              <Text className={`font-bold ${mode === 'signup' ? 'text-white' : 'text-[#A3A3A3]'}`}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          {mode === 'signup' && (
            <Input 
              label="Full Name" 
              placeholder="Enter your full name" 
              value={values.fullName}
              onChangeText={(val) => handleChange('fullName', val)}
              onBlur={() => handleBlur('fullName')}
              error={errors.fullName}
              touched={touched.fullName}
            />
          )}

          <Input 
            label="Email" 
            placeholder="Enter your email" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            value={values.email}
            onChangeText={(val) => handleChange('email', val)}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            touched={touched.email}
          />
          
          <Input 
            label="Password" 
            placeholder={mode === 'signin' ? "Enter your password" : "Create a password"} 
            secureTextEntry 
            value={values.password}
            onChangeText={(val) => handleChange('password', val)}
            onBlur={() => handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            rightIcon={<Icon name="eye-outline" size={20} color="#A3A3A3" />}
          />

          {mode === 'signin' && (
            <TouchableOpacity className="items-end mb-6 mt-1">
              <Text className="text-white font-bold text-sm">Forgot password?</Text>
            </TouchableOpacity>
          )}

          {mode === 'signup' && (
            <Input 
              label="Confirm Password" 
              placeholder="Confirm your password" 
              secureTextEntry 
              value={values.confirmPassword}
              onChangeText={(val) => handleChange('confirmPassword', val)}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          )}

          <View className="mt-4">
            <Button 
              title={mode === 'signin' ? "Sign In" : "Create Account"} 
              onPress={handleSubmit} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
