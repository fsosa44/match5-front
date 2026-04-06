import { create } from "zustand";
import { MatchData, FinishedMatchData } from "../types/match";
import {
  getMatches as fetchMatches,
  getFinishedMatches as fetchFinished,
} from "../api/matches";

interface PlayerRating {
  playerId: string;
  rating: number;
  comment?: string;
}

interface MatchesState {
  matches: MatchData[];
  finishedMatches: FinishedMatchData[];
  loading: boolean;
  fetchAll: () => Promise<void>;
  addMatch: (match: MatchData) => void;
  updateMatch: (match: MatchData) => void;
  rateMatch: (matchId: string, ratings: PlayerRating[]) => void;
  getPendingRating: () => FinishedMatchData | undefined;
}

export const useMatchesStore = create<MatchesState>((set, get) => ({
  matches: [],
  finishedMatches: [],
  loading: true,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const [upcoming, finished] = await Promise.all([
        fetchMatches().catch(() => []),
        fetchFinished().catch(() => []),
      ]);
      set({ matches: upcoming, finishedMatches: finished });
    } finally {
      set({ loading: false });
    }
  },

  addMatch: (match) => {
    set((state) => ({ matches: [match, ...state.matches] }));
  },

  updateMatch: (match) => {
    set((state) => ({
      matches: state.matches.map((m) => (m.id === match.id ? match : m)),
    }));
  },

  rateMatch: (matchId) => {
    set((state) => ({
      finishedMatches: state.finishedMatches.map((m) =>
        m.id === matchId ? { ...m, rated: true } : m
      ),
    }));
  },

  getPendingRating: () => {
    return get().finishedMatches.find((m) => !m.rated);
  },
}));
