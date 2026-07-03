import api from "./api";

interface LoginData {
  mobile: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response;
};

export const fetchMe = async () => {
  const response = await api.get("/auth/me");
  return response;
};

export interface RegisterData {
  name: string;
  mobile: string;
  password: string;
  address: string;
  village: string;
  dairyCode: string;
  secretaryName?: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response;
};
