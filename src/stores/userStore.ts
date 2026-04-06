import { create } from "zustand";
import { getMe } from "../api/auth";
import { updateProfile as updateProfileAPI, uploadProfilePhoto, UserProfile, UpdateProfilePayload } from "../api/users";

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  updateUser: (payload: UpdateProfilePayload) => Promise<UserProfile>;
  uploadPhoto: (file: File) => Promise<UserProfile>;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const data = await getMe();
      set({ user: data as unknown as UserProfile });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (payload) => {
    const updated = await updateProfileAPI(payload);
    set({ user: updated });
    return updated;
  },

  uploadPhoto: async (file) => {
    const updated = await uploadProfilePhoto(file);
    set({ user: updated });
    return updated;
  },

  clear: () => set({ user: null, loading: false }),
}));
