import React from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "../atoms/navigation/BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, noPadding, hideNav }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <main
        key={location.pathname}
        className={noPadding ? "" : hideNav ? "" : "pb-28"}
        style={{ animation: "pageEnter 0.35s ease-out" }}
      >
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default Layout;
