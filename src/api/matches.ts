import { api } from "./client";
import { MatchData, FinishedMatchData, Player } from "../types/match";

interface CreateMatchPayload {
  name?: string;
  location: string;
  lat: number;
  lng: number;
  date: string;
  time: string;
  maxPlayers: number;
  ageRange?: { min: number; max: number; label: string };
  intensity?: string;
}

// Formatea nombre como "E. Pérez" (inicial + apellido)
const formatPlayerName = (user: any): string => {
  const first = user.name || "";
  const last = user.lastName || "";
  if (first && last) return `${first[0].toUpperCase()}. ${last}`;
  return first || "Jugador";
};

// Transforma la respuesta del backend al formato que usa el frontend
const transformMatch = (m: any): MatchData => {
  const dateObj = new Date(m.date);
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);

  let dateLabel = dateObj.toLocaleDateString("es-AR");
  if (dateObj.toDateString() === today.toDateString()) dateLabel = "Hoy";
  else if (dateObj.toDateString() === tomorrow.toDateString()) dateLabel = "Mañana";

  return {
    id: m._id,
    time: m.time,
    date: dateLabel,
    location: m.location,
    lat: m.lat,
    lng: m.lng,
    maxPlayers: m.maxPlayers,
    players: m.players.map((slot: any) =>
      slot.user ? { id: slot.user._id || slot.user, name: formatPlayerName(slot.user) } : null
    ),
    ageRange: m.ageRange?.label ? m.ageRange : undefined,
    intensity: m.intensity,
  };
};

export const getMatches = async (): Promise<MatchData[]> => {
  const data = await api("/matches");
  return data.map(transformMatch);
};

export const getMatchById = async (id: string): Promise<MatchData> => {
  const data = await api(`/matches/${id}`);
  return transformMatch(data);
};

export const createMatch = async (payload: CreateMatchPayload): Promise<MatchData> => {
  const data = await api("/matches", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return transformMatch(data);
};

export const joinMatch = async (matchId: string, slotIndex: number): Promise<MatchData> => {
  const data = await api(`/matches/${matchId}/join`, {
    method: "POST",
    body: JSON.stringify({ slotIndex }),
  });
  return transformMatch(data);
};

export const leaveMatch = async (matchId: string): Promise<MatchData> => {
  const data = await api(`/matches/${matchId}/leave`, {
    method: "POST",
  });
  return transformMatch(data);
};

export const getFinishedMatches = async (): Promise<FinishedMatchData[]> => {
  const data = await api("/matches?status=finished");
  const pendingData = await api("/ratings/pending").catch(() => []);
  const pendingIds = new Set(pendingData.map((m: any) => m._id));

  return data.map((m: any): FinishedMatchData => {
    const base = transformMatch(m);

    const teamA: Player[] = m.players
      .filter((s: any) => s.team === "A" && s.user)
      .map((s: any) => ({ id: s.user._id || s.user, name: formatPlayerName(s.user) }));

    const teamB: Player[] = m.players
      .filter((s: any) => s.team === "B" && s.user)
      .map((s: any) => ({ id: s.user._id || s.user, name: formatPlayerName(s.user) }));

    return {
      ...base,
      status: "finished",
      result: m.result || { teamA: 0, teamB: 0 },
      teamA,
      teamB,
      rated: !pendingIds.has(m._id),
    };
  });
};
