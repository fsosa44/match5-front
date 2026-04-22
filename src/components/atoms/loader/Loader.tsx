import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  /** Optional label shown below the animation */
  label?: string;
  /** "screen" fills the viewport, "section" fits inside a container, "inline" is compact, "overlay" is fullscreen fixed backdrop */
  size?: "screen" | "section" | "inline" | "overlay";
}

const dots = [0, 1, 2, 3, 4];

const Loader: React.FC<LoaderProps> = ({ label, size = "section" }) => {
  if (size === "overlay") {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {dots.map((i) => (
            <motion.span
              key={i}
              className="h-3 w-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.6, 1], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="mt-3 h-1 w-16 rounded-full bg-primary/10 blur-sm" />
        {label && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
            {label}
          </p>
        )}
      </div>
    );
  }

  const wrapperClass =
    size === "screen"
      ? "flex min-h-[80vh] flex-col items-center justify-center"
      : size === "section"
      ? "flex flex-col items-center justify-center py-20"
      : "flex items-center justify-center gap-1.5 py-2";

  const dotSize = size === "inline" ? "h-1.5 w-1.5" : "h-2.5 w-2.5";

  return (
    <div className={wrapperClass}>
      {/* Dots with staggered pulse — resembles 5 players on a pitch */}
      <div className="flex items-center gap-2">
        {dots.map((i) => (
          <motion.span
            key={i}
            className={`${dotSize} rounded-full bg-primary`}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      {size !== "inline" && (
        <div className="mt-3 h-1 w-16 rounded-full bg-primary/10 blur-sm" />
      )}

      {/* Label */}
      {label && size !== "inline" && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
          {label}
        </p>
      )}
    </div>
  );
};

export default Loader;
