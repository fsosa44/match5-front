import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="w-full rounded-2xl bg-accent px-6 py-4 text-xl font-semibold text-button-text transition-all duration-200 hover:bg-accent-light active:scale-[0.98] active:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2 focus:ring-offset-primary"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
