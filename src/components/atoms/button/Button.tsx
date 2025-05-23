import React from "react";
import { colors } from "../../../constants/colors";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="text-2xl rounded-3xl px-4 py-4 font-bold w-full transition-colors"
      style={{
        backgroundColor: colors.accent,
        color: colors.buttonText,
      }}
      {...props}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = colors.accentLight;
        if (props.onMouseDown) props.onMouseDown(e);
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = colors.accent;
        if (props.onMouseUp) props.onMouseUp(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.accent;
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
