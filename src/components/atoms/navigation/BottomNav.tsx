import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../../constants/colors";
import { MdHomeFilled } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import { IoChatbox } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  return (
    <nav
      className="fixed bottom-0 left-0 w-full flex justify-around items-center py-4"
      style={{ backgroundColor: colors.inputBg }}
    >
      <span
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        {MdHomeFilled({
          size: 34,
          color: isHome ? colors.accent : "#6a9486",
        })}
      </span>
      {BiSolidNotepad({ size: 34, color: "#6a9486" })}
      {IoChatbox({ size: 34, color: "#6a9486" })}
      {FaUserAlt({ size: 28, color: "#6a9486" })}
    </nav>
  );
};

export default BottomNav;
