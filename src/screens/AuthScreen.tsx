import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/ui/Input';
import { Button } from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../hooks/useForm';
import { validateEmail, validatePassword, validateRequired } from '../utils/validators';
import { useUser } from '../context/UserContext';
import { AlertModal } from '../components/modals/AlertModal';

export const AuthScreen = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation<any>();
  const { updateProfile } = useUser();

  // Alert Modal State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{title: string, message: string, type: 'success' | 'error' | 'info'}>({
    title: '',
    message: '',
    type: 'info'
  });

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info' = 'error') => {
    setAlertConfig({ title, message, type });
    setAlertVisible(true);
  };

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
    async (formValues) => {
      try {
        const storedUsers = await AsyncStorage.getItem('registered_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        if (mode === 'signup') {
          // Check if user already exists
          if (users.find((u: any) => u.email.toLowerCase() === formValues.email.toLowerCase())) {
            showAlert('Registration Error', 'An account with this email already exists.', 'error');
            return;
          }

          // Add new user
          const newUser = {
            fullName: formValues.fullName,
            email: formValues.email,
            password: formValues.password
          };
          users.push(newUser);
          await AsyncStorage.setItem('registered_users', JSON.stringify(users));
          
          // Log in the user
          await updateProfile({ name: newUser.fullName, email: newUser.email });
          navigation.replace('MainTabs');
        } else {
          // Sign In
          const registeredUser = users.find((u: any) => 
            u.email.toLowerCase() === formValues.email.toLowerCase()
          );

          if (!registeredUser) {
            showAlert('User Not Found', 'This email is not registered. Please sign up first to create an account.', 'info');
            return;
          }

          if (registeredUser.password !== formValues.password) {
            showAlert('Login Error', 'The password you entered is incorrect. Please try again.', 'error');
            return;
          }

          // Successful Login
          await updateProfile({ name: registeredUser.fullName, email: registeredUser.email });
          navigation.replace('MainTabs');
        }
      } catch (e) {
        console.error('Auth Error', e);
        showAlert('System Error', 'Could not complete the request. Please try again later.', 'error');
      }
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
          <Text className="text-white text-2xl font-bold mb-2">Welcome to Ledge₹</Text>
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
            secureTextEntry={!showPassword} 
            value={values.password}
            onChangeText={(val) => handleChange('password', val)}
            onBlur={() => handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#A3A3A3" 
                />
              </TouchableOpacity>
            }
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
              secureTextEntry={!showConfirmPassword} 
              value={values.confirmPassword}
              onChangeText={(val) => handleChange('confirmPassword', val)}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#A3A3A3" 
                  />
                </TouchableOpacity>
              }
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

      <AlertModal 
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};
