import { addDeduction, deleteDeduction, fetchDeductions, updateDeduction } from "@/services/deduction";
import { create } from "zustand";

export interface Deduction {
  _id: string;
  date: string;
  type: string;
  amount: number;
  note: string;
}

interface DeductionStore {
  deductions: Deduction[];
  loading: boolean;
  create: (data: any) => Promise<boolean>;
  fetch: () => Promise<void>;
  update: (id: string, data: any) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
}

export const useDeductionStore = create<DeductionStore>((set) => ({
  deductions: [],
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
  fetch: async () => {
    try {
      set({ loading: true });
      const response = await fetchDeductions();
      if (response.data.success) {
        set({ deductions: response.data.data, loading: false });
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
      await updateDeduction(id, data);
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
      await deleteDeduction(id);
      set({ loading: false });
      return true;
    } catch (error) {
      console.error(error);
      set({ loading: false });
      return false;
    }
  },
}));
