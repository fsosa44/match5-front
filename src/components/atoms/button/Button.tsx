import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="w-full rounded-2xl px-6 py-4 text-lg font-bold text-button-text shadow-lg shadow-primary/10 transition-all duration-200 active:scale-[0.98] focus:outline-none disabled:opacity-50 bg-gradient-to-br from-primary to-primary-container"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
