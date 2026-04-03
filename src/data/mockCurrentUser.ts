import { PlayerProfile, PlayerReview } from "./mockPlayers";

export interface CurrentUser extends PlayerProfile {
  email: string;
  phone: string;
  location: string;
  memberSince: string;
}

export const currentUser: CurrentUser = {
  id: "current",
  name: "Francisco Sosa",
  position: "Mediocampista",
  birthDate: "2007-08-15",
  playStyle: "competitive",
  email: "francisco.sosa@email.com",
  phone: "+54 11 5555-1234",
  location: "Zona de Reserva, Avellaneda",
  memberSince: "Marzo 2025",
  rating: 5,
  matchesPlayed: 47,
  goals: 150,
  reviews: [
    {
      authorName: "Juan Pérez",
      rating: 5,
      comment:
        "De los mejores mediocampistas con los que jugué. Siempre bien ubicado y la mueve rápido.",
      date: "Hace 1 día",
    },
    {
      authorName: "Diego Martínez",
      rating: 4,
      comment:
        "Muy buen compañero, ordena el medio y mete pases clave. Recomendado.",
      date: "Hace 5 días",
    },
    {
      authorName: "Miguel Santos",
      rating: 5,
      comment: "Crack, de esos que hacen jugar al equipo. Siempre lo elijo.",
      date: "Hace 1 semana",
    },
    {
      authorName: "Pablo Fernández",
      rating: 4,
      comment: "Corre toda la cancha y no se queja nunca. Gran actitud.",
      date: "Hace 2 semanas",
    },
  ],
};
