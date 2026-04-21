import { api } from "./client";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export interface UserProfile {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  birthDate?: string;
  playStyle: string;
  location?: string;
  profilePhoto?: string | null;
  rating: number;
  matchesPlayed: number;
  goals: number;
  reviews: {
    author: string | { _id: string; name: string };
    rating: number;
    comment: string;
    createdAt?: string;
  }[];
  createdAt?: string;
}

export const getUserById = async (id: string): Promise<UserProfile> => {
  return api(`/users/${id}`);
};

export interface UpdateProfilePayload {
  name?: string;
  lastName?: string;
  phone?: string;
  position?: string;
  playStyle?: string;
  location?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
  return api("/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const uploadProfilePhoto = async (file: File): Promise<UserProfile> => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${API_URL}/users/me/photo`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al subir la foto");
  return data;
};

export interface SearchUser {
  _id: string;
  name: string;
  lastName?: string;
  position?: string;
  playStyle?: string;
}

export const searchUsers = async (query: string): Promise<SearchUser[]> => {
  return api(`/users/search?q=${encodeURIComponent(query)}`);
};
