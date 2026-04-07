import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Category } from '../types';
import { loadTransactions, saveTransactions, loadCategories, saveCategories } from '../storage/asyncStorage';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Salary', color: '#10B981', icon: 'cash', type: 'income' },
  { id: '2', name: 'Food', color: '#EF4444', icon: 'fast-food', type: 'expense' },
  { id: '3', name: 'Transport', color: '#F59E0B', icon: 'bus', type: 'expense' },
  { id: '4', name: 'Entertainment', color: '#8B5CF6', icon: 'film', type: 'expense' },
];

interface ExpenseContextProps {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextProps>({
  transactions: [],
  categories: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
  isLoading: true,
});

export const ExpenseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const storedTransactions = await loadTransactions();
      const storedCategories = await loadCategories();
      
      setTransactions(storedTransactions);
      
      if (storedCategories && storedCategories.length > 0) {
        setCategories(storedCategories);
      } else {
        setCategories(DEFAULT_CATEGORIES);
        await saveCategories(DEFAULT_CATEGORIES);
      }
      setIsLoading(false);
    };
    initData();
  }, []);

  const addTransaction = async (t: Transaction) => {
    const updated = [t, ...transactions];
    setTransactions(updated);
    await saveTransactions(updated);
  };

  const deleteTransaction = async (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    await saveTransactions(updated);
  };

  const addCategory = async (c: Category) => {
    const updated = [...categories, c];
    setCategories(updated);
    await saveCategories(updated);
  };

  const deleteCategory = async (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    await saveCategories(updated);
  };

  return (
    <ExpenseContext.Provider value={{ transactions, categories, addTransaction, deleteTransaction, addCategory, deleteCategory, isLoading }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
