import { loginUser } from "@/services/auth";
import { create } from "zustand";

interface LoginData {
  mobile: string;
  password: string;
}

interface AuthStore {
  loading: boolean;
  login: (data: LoginData) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  login: async (data) => {
    try {
      set({ loading: true });
      await loginUser(data);
      set({ loading: false });

      return true;
    } catch (error) {
      console.error(error);

      set({ loading: false });

      return false;
    }
  },
}));
