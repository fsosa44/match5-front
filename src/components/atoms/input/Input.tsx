import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full rounded-2xl bg-input px-5 py-4 text-base text-accent outline-none placeholder:text-accent/50 transition-all duration-200 focus:ring-2 focus:ring-accent/30"
      {...props}
    />
  );
};

export default Input;
