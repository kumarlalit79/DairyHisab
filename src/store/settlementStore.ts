import {
  getSettlementDetails,
  getSettlements,
  resetSettlement,
} from "@/services/settlement";
import { create } from "zustand";

interface SettlementStore {
  settlements: any[];
  settlementDetails: any | null;

  loading: boolean;

  fetchSettlements: () => Promise<void>;

  fetchSettlementDetails: (id: string) => Promise<void>;

  reset: () => Promise<boolean>;
}

export const useSettlementStore = create<SettlementStore>((set) => ({
  settlements: [],

  settlementDetails: null,

  loading: false,

  fetchSettlements: async () => {
    try {
      set({ loading: true });
      const res = await getSettlements();

      set({
        settlements: res.data.data,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });
    }
  },

  fetchSettlementDetails: async (id) => {
    try {
      set({ loading: true });

      const res = await getSettlementDetails(id);
      console.log("Settlement Details API", res.data);

      set({
        settlementDetails: res.data.data,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({
        loading: false,
      });
    }
  },

  reset: async () => {
    try {
      set({ loading: true });

      await resetSettlement();

      set({
        loading: false,
      });

      return true;
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });

      return false;
    }
  },
}));
