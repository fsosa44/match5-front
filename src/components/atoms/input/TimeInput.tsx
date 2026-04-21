import React, { useRef } from "react";

interface TimeInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  placeholder = "Hora",
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="relative w-full cursor-pointer rounded-2xl bg-input px-5 py-4"
      onClick={() => {
        try { inputRef.current?.showPicker(); } catch { inputRef.current?.focus(); }
      }}
    >
      {/* Visual label */}
      <span className={value ? "text-base text-accent" : "text-base text-accent/50"}>
        {value ? value : placeholder}
      </span>

      {/* Invisible native input — captures tap & triggers picker */}
      <input
        ref={inputRef}
        type="time"
        value={value}
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        tabIndex={-1}
      />
    </div>
  );
};

export default TimeInput;
