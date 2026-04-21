import { create } from "zustand";

export interface NotificationItem {
  id: string;
  type: "private" | "match";
  chatId: string;
  senderName: string;
  text: string;
  createdAt: string;
}

interface ChatState {
  /** Set of chatIds (matchId or conversationId) with unread messages */
  unreadChats: Set<string>;
  /** The chatId currently being viewed (so we can ignore notifications for it) */
  activeChatId: string | null;
  /** Recent notification items for the dropdown */
  notifications: NotificationItem[];
  addUnread: (chatId: string) => void;
  addNotification: (notif: Omit<NotificationItem, "id" | "createdAt">) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  clearUnread: (chatId: string) => void;
  setActiveChatId: (chatId: string | null) => void;
  totalUnread: () => number;
}

let notifCounter = 0;

export const useChatStore = create<ChatState>((set, get) => ({
  unreadChats: new Set(),
  activeChatId: null,
  notifications: [],

  addUnread: (chatId) => {
    const { activeChatId, unreadChats } = get();
    // Don't mark as unread if the user is currently viewing this chat
    if (chatId === activeChatId) return;
    const next = new Set(unreadChats);
    next.add(chatId);
    set({ unreadChats: next });
  },

  addNotification: (notif) => {
    const { activeChatId, notifications } = get();
    if (notif.chatId === activeChatId) return;
    const item: NotificationItem = {
      ...notif,
      id: `notif-${++notifCounter}`,
      createdAt: new Date().toISOString(),
    };
    set({ notifications: [item, ...notifications].slice(0, 30) });
  },

  removeNotification: (id) => {
    set({ notifications: get().notifications.filter((n) => n.id !== id) });
  },

  clearAllNotifications: () => {
    set({ notifications: [], unreadChats: new Set() });
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
