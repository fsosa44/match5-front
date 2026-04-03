import React, { createContext, useContext, useState } from "react";
import { MatchData, FinishedMatchData } from "../types/match";
import { mockMatches } from "../data/mockMatches";
import { mockFinishedMatches } from "../data/mockFinishedMatches";

interface PlayerRating {
  playerId: string;
  rating: number;
  comment?: string;
}

interface MatchesContextType {
  matches: MatchData[];
  addMatch: (match: MatchData) => void;
  finishedMatches: FinishedMatchData[];
  rateMatch: (matchId: string, ratings: PlayerRating[]) => void;
  getPendingRating: () => FinishedMatchData | undefined;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matches, setMatches] = useState<MatchData[]>(mockMatches);
  const [finishedMatches, setFinishedMatches] =
    useState<FinishedMatchData[]>(mockFinishedMatches);

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
      value={{ matches, addMatch, finishedMatches, rateMatch, getPendingRating }}
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
