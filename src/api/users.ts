import { api } from "./client";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  birthDate?: string;
  playStyle: string;
  location?: string;
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

export interface SearchUser {
  _id: string;
  name: string;
  position?: string;
  playStyle?: string;
}

export const searchUsers = async (query: string): Promise<SearchUser[]> => {
  return api(`/users/search?q=${encodeURIComponent(query)}`);
};
