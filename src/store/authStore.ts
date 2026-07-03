import { loginUser, logoutUser, fetchMe, registerUser, RegisterData } from "@/services/auth";
import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  village: string;
  dairyCode: string;
  secretaryName: string;
}

interface LoginData {
  mobile: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
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
  register: async (data) => {
    try {
      set({ loading: true });
      const response = await registerUser(data);
      set({ loading: false });
      return { success: true, message: response.data.message || "Registration Successful" };
    } catch (error: any) {
      console.error(error);
      set({ loading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed. Please try again." 
      };
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      await logoutUser();
      set({ user: null, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  fetchUser: async () => {
    try {
      set({ loading: true });
      const response = await fetchMe();
      if (response.data.success) {
        set({ user: response.data.data, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      set({ user: null, loading: false });
    }
  },
}));
