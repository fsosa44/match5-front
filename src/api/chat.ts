import { api } from "./client";

export interface ChatMessage {
  _id: string;
  match: string;
  sender: { _id: string; name: string; profilePhoto?: string | null };
  text: string;
  createdAt: string;
}

export const getMessages = async (matchId: string): Promise<ChatMessage[]> => {
  return api(`/chat/${matchId}`);
};
