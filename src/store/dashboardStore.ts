import { create } from "zustand";
import { getDashboard } from "@/services/dashboard";
import { DashboardData } from "@/types/dashboard";

interface DashboardState {
  dashboard: DashboardData | null;
  loading: boolean;
  fetchDashboard: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboard: null,
  loading: false,
  fetchDashboard: async () => {
    set({ loading: true });

    try {
      const res = await getDashboard();
      console.log("API Response:", res.data)
      set({
        dashboard: res.data.data,
        loading: false,
      });
    } catch(error) {
      console.error(error);
      set({
        loading: false,
      });
    }
  },
}));
