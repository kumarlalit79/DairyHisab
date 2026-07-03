import { addMilkEntry } from "@/services/milk";
import { create } from "zustand";

interface MilkStore {
  loading: boolean;
  create: (data: any) => Promise<boolean>;
}

export const useMilkStore = create<MilkStore>((set) => ({
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
}));
