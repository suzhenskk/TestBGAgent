import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Progress {
  child_id: string;
  content_id: string;
  module_type: string;
  completion_percentage: number;
  last_updated: string;
}

interface ProgressState {
  progress: Record<string, number>; // module_type -> completion_percentage
  loading: boolean;
  error: string | null;
  updateProgress: (childId: string, moduleType: string, percentage: number) => Promise<void>;
  loadProgress: (childId: string) => Promise<void>;
  getModuleProgress: (moduleType: string) => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},
  loading: false,
  error: null,

  updateProgress: async (childId, moduleType, percentage) => {
    set({ loading: true, error: null });
    try {
      // First, check if there's existing progress for this module
      const { data: existingProgress, error: fetchError } = await supabase
        .from('progress')
        .select('id')
        .eq('child_id', childId)
        .eq('module_type', moduleType)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError; // PGRST116 is "No rows returned"

      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('progress')
          .update({ completion_percentage: percentage, last_updated: new Date().toISOString() })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress record
        await supabase
          .from('progress')
          .insert({
            child_id: childId,
            module_type: moduleType,
            completion_percentage: percentage,
            last_updated: new Date().toISOString()
          });
      }

      // Update local state
      set((state) => ({
        progress: {
          ...state.progress,
          [moduleType]: percentage
        }
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  loadProgress: async (childId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('module_type, completion_percentage')
        .eq('child_id', childId);

      if (error) throw error;

      const progressMap: Record<string, number> = {};
      data?.forEach((item) => {
        progressMap[item.module_type] = item.completion_percentage;
      });

      set({ progress: progressMap });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getModuleProgress: (moduleType) => {
    const { progress } = get();
    return progress[moduleType] || 0;
  },
}));
