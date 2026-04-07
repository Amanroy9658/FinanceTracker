import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, Category } from '../types';

const TRANSACTIONS_KEY = '@tracker_transactions';
const CATEGORIES_KEY = '@tracker_categories';

export const saveTransactions = async (transactions: Transaction[]) => {
  try {
    await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (e) {
    console.error('Failed to save transactions', e);
  }
};

export const loadTransactions = async (): Promise<Transaction[]> => {
  try {
    const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load transactions', e);
    return [];
  }
};

export const saveCategories = async (categories: Category[]) => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save categories', e);
  }
};

export const loadCategories = async (): Promise<Category[] | null> => {
  try {
    const data = await AsyncStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load categories', e);
    return null;
  }
};
