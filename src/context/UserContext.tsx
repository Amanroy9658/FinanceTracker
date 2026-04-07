import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  name: string;
  email: string;
}

interface UserContextProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Striver',
  email: 'striver@gmail.com',
};

const UserContext = createContext<UserContextProps>({
  profile: DEFAULT_PROFILE,
  updateProfile: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem('user_profile');
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const updateProfile = async (newProfile: UserProfile) => {
    try {
      setProfile(newProfile);
      await AsyncStorage.setItem('user_profile', JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_profile');
      setProfile(DEFAULT_PROFILE);
    } catch (e) {
      console.error('Failed to logout', e);
    }
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
