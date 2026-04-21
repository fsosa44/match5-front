import React, { useRef } from "react";

interface DateInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  placeholder = "Fecha",
  value,
  onChange,
  min,
  max,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formattedValue = value
    ? new Date(value + "T12:00:00").toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div
      className="relative w-full cursor-pointer rounded-2xl bg-input px-5 py-4"
      onClick={() => {
        try { inputRef.current?.showPicker(); } catch { inputRef.current?.focus(); }
      }}
    >
      {/* Visual label */}
      <span className={value ? "text-base text-accent" : "text-base text-accent/50"}>
        {value ? formattedValue : placeholder}
      </span>

      {/* Invisible native input — captures tap & triggers picker */}
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        tabIndex={-1}
      />
    </div>
  );
};

export default DateInput;
