import { addMilkEntry, deleteMilkEntry, fetchMilkEntries, updateMilkEntry } from "@/services/milk";
import { create } from "zustand";

export interface MilkEntry {
  _id: string;
  date: string;
  shift: string;
  milkAmount: number;
  bonus: number;
}

interface MilkStore {
  entries: MilkEntry[];
  loading: boolean;
  create: (data: any) => Promise<boolean>;
  fetch: () => Promise<void>;
  update: (id: string, data: any) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
}

export const useMilkStore = create<MilkStore>((set) => ({
  entries: [],
  loading: false,
  create: async (data) => {
    try {
      set({
        loading: true,
      });
      await addMilkEntry(data);

      set({
        loading: false,
      });

      return true;
    } catch (error) {
        console.error(error);
        set({
            loading: false
        })
        return false
    }
  },
  fetch: async () => {
    try {
      set({ loading: true });
      const response = await fetchMilkEntries();
      if (response.data.success) {
        set({ entries: response.data.data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  update: async (id, data) => {
    try {
      set({ loading: true });
      await updateMilkEntry(id, data);
      set({ loading: false });
      return true;
    } catch (error) {
      console.error(error);
      set({ loading: false });
      return false;
    }
  },
  remove: async (id) => {
    try {
      set({ loading: true });
      await deleteMilkEntry(id);
      set({ loading: false });
      return true;
    } catch (error) {
      console.error(error);
      set({ loading: false });
      return false;
    }
  },
}));
