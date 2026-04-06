import { api } from "./client";

export interface ConversationParticipant {
  _id: string;
  name: string;
  position?: string;
  profilePhoto?: string | null;
}

export interface Conversation {
  _id: string;
  participants: ConversationParticipant[];
  lastMessage?: {
    text: string;
    sender: string;
    createdAt: string;
  };
  updatedAt: string;
}

export interface PrivateMessage {
  _id: string;
  conversation: string;
  sender: { _id: string; name: string; profilePhoto?: string | null };
  text: string;
  createdAt: string;
}

export const getConversations = (): Promise<Conversation[]> =>
  api("/conversations");

export const getConversationById = (conversationId: string): Promise<Conversation> =>
  api(`/conversations/${conversationId}`);

export const getOrCreateConversation = (participantId: string): Promise<Conversation> =>
  api("/conversations", {
    method: "POST",
    body: JSON.stringify({ participantId }),
  });

export const getPrivateMessages = (conversationId: string): Promise<PrivateMessage[]> =>
  api(`/conversations/${conversationId}/messages`);
