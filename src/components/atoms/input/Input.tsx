import React from "react";
import { colors } from "../../../constants/colors";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="text-lg rounded-3xl px-4 py-4 outline-none w-full placeholder-[#7ac34a]"
      style={{
        backgroundColor: colors.inputBg,
        color: colors.accent,
      }}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

export default Input;
