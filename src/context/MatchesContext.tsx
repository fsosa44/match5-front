import React, { createContext, useContext, useState, useEffect } from "react";
import { MatchData, FinishedMatchData } from "../types/match";
import { getMatches as fetchMatches, getFinishedMatches as fetchFinished } from "../api/matches";

interface PlayerRating {
  playerId: string;
  rating: number;
  comment?: string;
}

interface MatchesContextType {
  matches: MatchData[];
  loading: boolean;
  addMatch: (match: MatchData) => void;
  finishedMatches: FinishedMatchData[];
  rateMatch: (matchId: string, ratings: PlayerRating[]) => void;
  getPendingRating: () => FinishedMatchData | undefined;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [finishedMatches, setFinishedMatches] = useState<FinishedMatchData[]>([]);

  useEffect(() => {
    Promise.all([
      fetchMatches().catch(() => []),
      fetchFinished().catch(() => []),
    ])
      .then(([upcoming, finished]) => {
        setMatches(upcoming);
        setFinishedMatches(finished);
      })
      .finally(() => setLoading(false));
  }, []);

  const addMatch = (match: MatchData) => {
    setMatches((prev) => [match, ...prev]);
  };

  const rateMatch = (matchId: string, _ratings: PlayerRating[]) => {
    setFinishedMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, rated: true } : m))
    );
  };

  const getPendingRating = () => {
    return finishedMatches.find((m) => !m.rated);
  };

  return (
    <MatchesContext.Provider
      value={{ matches, loading, addMatch, finishedMatches, rateMatch, getPendingRating }}
    >
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (!context) {
    throw new Error("useMatches must be used within a MatchesProvider");
  }
  return context;
};
