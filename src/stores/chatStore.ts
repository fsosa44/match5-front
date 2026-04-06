import { create } from "zustand";

interface ChatState {
  /** Set of chatIds (matchId or conversationId) with unread messages */
  unreadChats: Set<string>;
  /** The chatId currently being viewed (so we can ignore notifications for it) */
  activeChatId: string | null;
  addUnread: (chatId: string) => void;
  clearUnread: (chatId: string) => void;
  setActiveChatId: (chatId: string | null) => void;
  totalUnread: () => number;
}

export const useChatStore = create<ChatState>((set, get) => ({
  unreadChats: new Set(),
  activeChatId: null,

  addUnread: (chatId) => {
    const { activeChatId, unreadChats } = get();
    // Don't mark as unread if the user is currently viewing this chat
    if (chatId === activeChatId) return;
    const next = new Set(unreadChats);
    next.add(chatId);
    set({ unreadChats: next });
  },

  clearUnread: (chatId) => {
    const { unreadChats } = get();
    if (!unreadChats.has(chatId)) return;
    const next = new Set(unreadChats);
    next.delete(chatId);
    set({ unreadChats: next });
  },

  setActiveChatId: (chatId) => {
    set({ activeChatId: chatId });
    if (chatId) {
      // Also clear unread for this chat when entering
      const { unreadChats } = get();
      if (unreadChats.has(chatId)) {
        const next = new Set(unreadChats);
        next.delete(chatId);
        set({ unreadChats: next });
      }
    }
  },

  totalUnread: () => get().unreadChats.size,
}));
