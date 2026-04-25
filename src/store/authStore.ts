import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: string;
}

interface Child {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  level: string;
}

interface AuthState {
  user: User | null;
  children: Child[];
  currentChild: Child | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addChild: (name: string, age: number) => Promise<void>;
  selectChild: (child: Child) => void;
  loadChildren: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  children: [],
  currentChild: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        set({ user: { id: data.user.id, email: data.user.email!, role: 'parent' } });
        await get().loadChildren();
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        set({ user: { id: data.user.id, email: data.user.email!, role: 'parent' } });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, children: [], currentChild: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addChild: async (name, age) => {
    set({ loading: true, error: null });
    try {
      const { user } = get();
      if (!user) throw new Error('User not logged in');
      
      const { data, error } = await supabase
        .from('children')
        .insert({ parent_id: user.id, name, age, level: 'beginner' })
        .select();
      
      if (error) throw error;
      if (data && data[0]) {
        set((state) => ({
          children: [...state.children, data[0]],
          currentChild: state.currentChild || data[0]
        }));
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  selectChild: (child) => {
    set({ currentChild: child });
  },

  loadChildren: async () => {
    const { user } = get();
    if (!user) return;
    
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id);
      
      if (error) throw error;
      set({ children: data || [], currentChild: (data && data[0]) || null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
