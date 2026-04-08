import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView,  Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/ui/Input';
import { Button } from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../hooks/useForm';
import { validateEmail, validatePassword, validateRequired } from '../utils/validators';
import { useUser } from '../context/UserContext';
import { useTheme } from '../theme/ThemeContext';
import { AlertModal } from '../components/modals/AlertModal';

export const AuthScreen = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation<any>();
  const { updateProfile } = useUser();
  const { theme } = useTheme();

  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        const storedUsers = await AsyncStorage.getItem('registered_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        if (mode === 'signup') {
          // Check if user already exists
          if (users.find((u: any) => u.email.toLowerCase() === formValues.email.toLowerCase())) {
            setLoading(false);
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
            setLoading(false);
            showAlert('User Not Found', 'This email is not registered. Please sign up first to create an account.', 'info');
            return;
          }

          if (registeredUser.password !== formValues.password) {
            setLoading(false);
            showAlert('Login Error', 'The password you entered is incorrect. Please try again.', 'error');
            return;
          }

          // Successful Login
          await updateProfile({ name: registeredUser.fullName, email: registeredUser.email });
          navigation.replace('MainTabs');
        }
      } catch (e) {
        setLoading(false);
        console.error('Auth Error', e);
        showAlert('System Error', 'Could not complete the request. Please try again later.', 'error');
      }
    }
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60 }} keyboardShouldPersistTaps="handled">
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl justify-center items-center mb-6" style={{ backgroundColor: theme.text }}>
            <Text className="font-lexendBold text-3xl" style={{ color: theme.background }}>L</Text>
          </View>
          <Text className="text-2xl font-lexendBold mb-2" style={{ color: theme.text }}>Welcome to Ledge₹</Text>
          <Text className="text-center px-4 font-poppins" style={{ color: theme.textSecondary }}>Send money globally with the real exchange rate</Text>
        </View>

        <View className="rounded-3xl p-6 shadow-lg m-2 mt-4 pb-8 border-[1px]" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
          <Text className="text-xl font-lexendBold mb-2" style={{ color: theme.text }}>Get started</Text>
          <Text className="text-sm mb-6 font-poppins" style={{ color: theme.textSecondary }}>Sign in to your account or create a new one</Text>

          <View className="flex-row border-[1px] rounded-full p-1 mb-6" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
            <TouchableOpacity 
              onPress={() => setMode('signin')}
              className="flex-1 py-3 rounded-full items-center"
              style={mode === 'signin' ? { backgroundColor: theme.border } : {}}
            >
              <Text className="font-lexendBold" style={{ color: mode === 'signin' ? theme.text : theme.textSecondary }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setMode('signup')}
              className="flex-1 py-3 rounded-full items-center"
              style={mode === 'signup' ? { backgroundColor: theme.border } : {}}
            >
              <Text className="font-lexendBold" style={{ color: mode === 'signup' ? theme.text : theme.textSecondary }}>Sign Up</Text>
            </TouchableOpacity>
          </View>

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
              <Text className="font-lexendBold text-sm" style={{ color: theme.text }}>Forgot password?</Text>
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
                    color={theme.textSecondary} 
                  />
                </TouchableOpacity>
              }
            />
          )}

          <View className="mt-4">
            <Button 
              title={mode === 'signin' ? "Sign In" : "Create Account"} 
              onPress={handleSubmit} 
              loading={loading}
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
