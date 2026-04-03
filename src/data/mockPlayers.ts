export interface PlayerReview {
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  position: string;
  rating: number;
  matchesPlayed: number;
  goals: number;
  birthDate: string;
  playStyle: "recreational" | "competitive" | "flexible";
  reviews: PlayerReview[];
}

export const mockPlayers: Record<string, PlayerProfile> = {
  "1": {
    id: "1",
    name: "Juan Pérez",
    position: "Delantero",
    rating: 4.2,
    matchesPlayed: 34,
    goals: 18,
    birthDate: "2002-03-15",
    playStyle: "competitive",
    reviews: [
      {
        authorName: "Carlos López",
        rating: 5,
        comment: "Crack total, siempre en posición y buen compañero.",
        date: "Hace 2 días",
      },
      {
        authorName: "Diego Martínez",
        rating: 4,
        comment: "Muy rápido y con buen gol. A veces no baja a defender.",
        date: "Hace 1 semana",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Carlos López",
    position: "Mediocampista",
    rating: 3.8,
    matchesPlayed: 28,
    goals: 7,
    birthDate: "2000-07-22",
    playStyle: "flexible",
    reviews: [
      {
        authorName: "Juan Pérez",
        rating: 4,
        comment: "Buen pase largo y siempre corre. Recomendado.",
        date: "Hace 3 días",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Diego Martínez",
    position: "Defensor",
    rating: 4.5,
    matchesPlayed: 42,
    goals: 2,
    birthDate: "1995-11-08",
    playStyle: "competitive",
    reviews: [
      {
        authorName: "Andrés García",
        rating: 5,
        comment: "Muro. No pasa nadie cuando juega.",
        date: "Hace 5 días",
      },
      {
        authorName: "Lucas Rodríguez",
        rating: 4,
        comment: "Muy sólido atrás, ordena bien la defensa.",
        date: "Hace 2 semanas",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Andrés García",
    position: "Arquero",
    rating: 4.0,
    matchesPlayed: 20,
    goals: 0,
    birthDate: "2004-01-30",
    playStyle: "recreational",
    reviews: [
      {
        authorName: "Diego Martínez",
        rating: 4,
        comment: "Ataja bien y tiene buena salida con los pies.",
        date: "Hace 1 semana",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Lucas Rodríguez",
    position: "Delantero",
    rating: 3.5,
    matchesPlayed: 15,
    goals: 9,
    birthDate: "2005-09-12",
    playStyle: "recreational",
    reviews: [
      {
        authorName: "Juan Pérez",
        rating: 3,
        comment: "Tiene gol pero a veces no pasa la pelota.",
        date: "Hace 4 días",
      },
    ],
  },
  "6": {
    id: "6",
    name: "Miguel Santos",
    position: "Mediocampista",
    rating: 4.3,
    matchesPlayed: 38,
    goals: 12,
    birthDate: "1990-05-18",
    playStyle: "competitive",
    reviews: [
      {
        authorName: "Tomás Aranda",
        rating: 5,
        comment: "El mejor mediocampista con el que jugué. Visión de juego increíble.",
        date: "Hace 3 días",
      },
    ],
  },
  "7": {
    id: "7",
    name: "Tomás Aranda",
    position: "Defensor",
    rating: 3.9,
    matchesPlayed: 25,
    goals: 1,
    birthDate: "1998-12-03",
    playStyle: "flexible",
    reviews: [
      {
        authorName: "Pablo Fernández",
        rating: 4,
        comment: "Serio atrás, no regala nada.",
        date: "Hace 1 semana",
      },
    ],
  },
  "8": {
    id: "8",
    name: "Pablo Fernández",
    position: "Delantero",
    rating: 4.7,
    matchesPlayed: 50,
    goals: 35,
    birthDate: "1992-08-25",
    playStyle: "competitive",
    reviews: [
      {
        authorName: "Miguel Santos",
        rating: 5,
        comment: "Goleador nato. Siempre hace la diferencia.",
        date: "Hace 2 días",
      },
      {
        authorName: "Ricardo Martínez",
        rating: 5,
        comment: "Mejor jugador del grupo lejos.",
        date: "Hace 1 semana",
      },
    ],
  },
  "9": {
    id: "9",
    name: "Matías Silva",
    position: "Mediocampista",
    rating: 3.6,
    matchesPlayed: 18,
    goals: 4,
    birthDate: "2003-04-10",
    playStyle: "recreational",
    reviews: [
      {
        authorName: "Facundo Cristaldo",
        rating: 4,
        comment: "Buen jugador, corre mucho y juega simple.",
        date: "Hace 5 días",
      },
    ],
  },
  "10": {
    id: "10",
    name: "Ricardo Martínez",
    position: "Defensor",
    rating: 4.1,
    matchesPlayed: 30,
    goals: 3,
    birthDate: "1988-02-14",
    playStyle: "flexible",
    reviews: [
      {
        authorName: "Santiago Torres",
        rating: 4,
        comment: "Firme y con buena salida. Muy confiable.",
        date: "Hace 3 días",
      },
    ],
  },
  "11": {
    id: "11",
    name: "Facundo Cristaldo",
    position: "Mediocampista",
    rating: 4.4,
    matchesPlayed: 33,
    goals: 10,
    birthDate: "1997-06-20",
    playStyle: "competitive",
    reviews: [
      {
        authorName: "Matías Silva",
        rating: 5,
        comment: "Enganche de los de antes. Juega distinto.",
        date: "Hace 4 días",
      },
    ],
  },
  "12": {
    id: "12",
    name: "Santiago Torres",
    position: "Arquero",
    rating: 3.7,
    matchesPlayed: 22,
    goals: 0,
    birthDate: "2001-10-05",
    playStyle: "recreational",
    reviews: [
      {
        authorName: "Ricardo Martínez",
        rating: 4,
        comment: "Seguro bajo los tres palos. Buen reflejo.",
        date: "Hace 1 semana",
      },
    ],
  },
};
