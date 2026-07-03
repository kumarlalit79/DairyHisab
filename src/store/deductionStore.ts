import { addDeduction } from "@/services/deduction";
import { create } from "zustand";

interface DeductionStore {
  loading: boolean;
  create: (data: any) => Promise<boolean>;
}

export const useDeductionStore = create<DeductionStore>((set) => ({
  loading: false,

  create: async (data) => {
    try {
      set({
        loading: true,
      });
      await addDeduction(data);

      set({ loading: false });

      return true;
    } catch (error) {
      console.error(error);
      set({ loading: false });
      return false;
    }
  },
}));
