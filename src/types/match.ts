export type PlayStyle = "recreational" | "competitive" | "flexible";

export interface Player {
  id: string;
  name: string;
}

export interface AgeRange {
  min: number;
  max: number;
  label: string;
}

export interface MatchData {
  id: string;
  time: string;
  date: string;
  location: string;
  lat: number;
  lng: number;
  maxPlayers: number;
  players: (Player | null)[];
  ageRange?: AgeRange;
  intensity?: PlayStyle;
}

export interface FinishedMatchData extends MatchData {
  status: "finished";
  result: { teamA: number; teamB: number };
  teamA: Player[];
  teamB: Player[];
  rated: boolean;
}
