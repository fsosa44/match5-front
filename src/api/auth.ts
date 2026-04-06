import { api } from "./client";

interface RegisterPayload {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    position: string;
    playStyle: string;
    rating: number;
    matchesPlayed: number;
    goals: number;
  };
  token: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const data = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);
  return data;
};

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const data = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user._id);
  return data;
};

export const getMe = async (): Promise<any> => {
  return api("/auth/me");
};
