import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdHomeFilled } from "react-icons/md";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { useChatStore } from "../../../stores/chatStore";

interface NavItem {
  icon: React.ElementType;
  path: string;
  size: number;
  label: string;
}

const navItems: NavItem[] = [
  { icon: MdHomeFilled, path: "/", size: 24, label: "Inicio" },
  { icon: FaMapMarkerAlt, path: "/map", size: 20, label: "Map" },
  { icon: IoChatbox, path: "/chat", size: 24, label: "Chats" },
  { icon: FaUserAlt, path: "/profile", size: 20, label: "Perfil" },
];

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 28,
};

// Full-width state (starting point for map enter animation)
const fullWidthState = {
  width: window.innerWidth,
  borderRadius: 0,
  marginBottom: 0,
  boxShadow: "0 0px 0px rgba(0,0,0,0)",
};

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMap = location.pathname === "/map";
  const unreadCount = useChatStore((s) => s.unreadChats.size);

  return (
    <div className="fixed bottom-0 left-0 z-[1000] flex w-full justify-center">
      <motion.nav
        initial={isMap ? fullWidthState : false}
        animate={{
          width: isMap ? 240 : window.innerWidth,
          borderRadius: isMap ? 9999 : 32,
          marginBottom: isMap ? 16 : 0,
          boxShadow: isMap
            ? "0 10px 30px rgba(0,0,0,0.5)"
            : "0 -4px 40px rgba(208,254,235,0.04)",
        }}
        transition={spring}
        className="overflow-hidden border-t border-white/[0.06]"
        style={{
          background: "rgba(0, 18, 11, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <motion.div
          className="flex items-center justify-around"
          initial={isMap ? { paddingLeft: 8, paddingRight: 8 } : false}
          animate={{
            paddingTop: 12,
            paddingBottom: 32,
            paddingLeft: isMap ? 24 : 8,
            paddingRight: isMap ? 24 : 8,
          }}
          transition={spring}
        >
          {navItems.map(({ icon: Icon, path, size, label }) => {
            const isActive = location.pathname === path;
            const showBadge = path === "/chat" && unreadCount > 0;
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                className={`relative flex flex-col items-center gap-1 ${
                  isActive
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary/70"
                }`}
                whileTap={{ scale: 0.85 }}
                initial={isMap ? { scale: 1 } : false}
                animate={{ scale: isMap ? 0.9 : 1 }}
                transition={spring}
              >
                <div className="relative">
                  <Icon size={size} />
                  {showBadge && (
                    <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold leading-none text-on-error">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
                {!isMap && (
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest ${
                      isActive ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {label}
                  </span>
                )}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-1 w-1 rounded-full bg-primary"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default BottomNav;
