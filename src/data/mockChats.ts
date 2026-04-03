export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
}

export interface ChatRoom {
  matchId: string;
  matchLocation: string;
  matchDate: string;
  matchTime: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export const mockChats: ChatRoom[] = [
  {
    matchId: "1",
    matchLocation: "La Fábrica de Fútbol",
    matchDate: "Hoy",
    matchTime: "18:00 hs",
    lastMessage: "Dale, nos vemos a las 18 en la cancha",
    lastMessageTime: "14:32",
    unreadCount: 3,
    messages: [
      {
        id: "m1",
        senderId: "1",
        senderName: "Juan Pérez",
        text: "Buenas, ya reservé la cancha para hoy",
        time: "12:10",
      },
      {
        id: "m2",
        senderId: "2",
        senderName: "Carlos López",
        text: "Genial! Yo llego 17:45 aprox",
        time: "12:15",
      },
      {
        id: "m3",
        senderId: "3",
        senderName: "Diego Martínez",
        text: "Alguien lleva pecheras?",
        time: "13:00",
      },
      {
        id: "m4",
        senderId: "current",
        senderName: "Francisco Sosa",
        text: "Yo llevo las pecheras, tranqui",
        time: "13:05",
      },
      {
        id: "m5",
        senderId: "4",
        senderName: "Andrés García",
        text: "Crack Fran! Yo llevo agua",
        time: "13:20",
      },
      {
        id: "m6",
        senderId: "1",
        senderName: "Juan Pérez",
        text: "Nos faltan 5, compartan el link",
        time: "14:00",
      },
      {
        id: "m7",
        senderId: "5",
        senderName: "Lucas Rodríguez",
        text: "Dale, nos vemos a las 18 en la cancha",
        time: "14:32",
      },
    ],
  },
  {
    matchId: "2",
    matchLocation: "La MECA (Futbol-Padel)",
    matchDate: "Hoy",
    matchTime: "20:30 hs",
    lastMessage: "Confirmados 7, faltan 5 más",
    lastMessageTime: "15:10",
    unreadCount: 1,
    messages: [
      {
        id: "m8",
        senderId: "6",
        senderName: "Miguel Santos",
        text: "Armé partido para esta noche en La MECA",
        time: "10:00",
      },
      {
        id: "m9",
        senderId: "7",
        senderName: "Tomás Aranda",
        text: "Yo me sumo, cuenten conmigo",
        time: "10:30",
      },
      {
        id: "m10",
        senderId: "current",
        senderName: "Francisco Sosa",
        text: "Entro! A qué hora es?",
        time: "11:00",
      },
      {
        id: "m11",
        senderId: "6",
        senderName: "Miguel Santos",
        text: "20:30, la cancha ya está paga",
        time: "11:05",
      },
      {
        id: "m12",
        senderId: "8",
        senderName: "Pablo Fernández",
        text: "Confirmados 7, faltan 5 más",
        time: "15:10",
      },
    ],
  },
  {
    matchId: "3",
    matchLocation: "Cancha Sarandí",
    matchDate: "Mañana",
    matchTime: "16:00 hs",
    lastMessage: "Necesitamos arquero, alguien sabe de alguno?",
    lastMessageTime: "Ayer",
    unreadCount: 0,
    messages: [
      {
        id: "m13",
        senderId: "1",
        senderName: "Juan Pérez",
        text: "Armo para mañana a las 16 en Sarandí",
        time: "Ayer 18:00",
      },
      {
        id: "m14",
        senderId: "8",
        senderName: "Pablo Fernández",
        text: "Me prendo, pero necesitamos más gente",
        time: "Ayer 18:20",
      },
      {
        id: "m15",
        senderId: "current",
        senderName: "Francisco Sosa",
        text: "Yo voy seguro, paso el link a unos pibes",
        time: "Ayer 19:00",
      },
      {
        id: "m16",
        senderId: "1",
        senderName: "Juan Pérez",
        text: "Necesitamos arquero, alguien sabe de alguno?",
        time: "Ayer 20:30",
      },
    ],
  },
];
