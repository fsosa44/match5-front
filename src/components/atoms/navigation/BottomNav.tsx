import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdHomeFilled } from "react-icons/md";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";

interface NavItem {
  icon: React.ElementType;
  path: string;
  size: number;
}

const navItems: NavItem[] = [
  { icon: MdHomeFilled, path: "/", size: 28 },
  { icon: FaMapMarkerAlt, path: "/map", size: 24 },
  { icon: IoChatbox, path: "/chat", size: 28 },
  { icon: FaUserAlt, path: "/profile", size: 24 },
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

  return (
    <div className="fixed bottom-0 left-0 z-[1000] flex w-full justify-center">
      <motion.nav
        // On map: start from full-width and animate to compact (spring)
        // On other pages: no mount animation (initial=false)
        initial={isMap ? fullWidthState : false}
        animate={{
          width: isMap ? 240 : window.innerWidth,
          borderRadius: isMap ? 9999 : 0,
          marginBottom: isMap ? 16 : 0,
          boxShadow: isMap
            ? "0 10px 30px rgba(0,0,0,0.5)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={spring}
        className="overflow-hidden bg-input"
      >
        <motion.div
          className="flex items-center justify-around"
          initial={isMap ? { paddingLeft: 8, paddingRight: 8 } : false}
          animate={{
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: isMap ? 24 : 8,
            paddingRight: isMap ? 24 : 8,
          }}
          transition={spring}
        >
          {navItems.map(({ icon: Icon, path, size }) => {
            const isActive = location.pathname === path;
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center ${
                  isActive
                    ? "text-accent"
                    : "text-inactive hover:text-accent/70"
                }`}
                whileTap={{ scale: 0.85 }}
                initial={isMap ? { scale: 1 } : false}
                animate={{ scale: isMap ? 0.9 : 1 }}
                transition={spring}
              >
                <Icon size={size} />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 h-1 w-1 rounded-full bg-accent"
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
