import { api } from "./client";

interface RatingPayload {
  player: string;
  rating: number;
  comment?: string;
}

export const rateMatch = async (matchId: string, ratings: RatingPayload[]) => {
  return api(`/ratings/${matchId}`, {
    method: "POST",
    body: JSON.stringify({ ratings }),
  });
};

export const getMatchRatings = async (matchId: string) => {
  return api(`/ratings/${matchId}`);
};

export const getPendingRatings = async () => {
  return api("/ratings/pending");
};
