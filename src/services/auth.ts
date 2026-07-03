import api from "./api";

interface LoginData {
  mobile: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response;
};
