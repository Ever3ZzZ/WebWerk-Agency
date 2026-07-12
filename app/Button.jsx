"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Button({ children, href, variant = "primary", className = "", hasSeaFill = false, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const isPrimary = variant === "primary";
  const baseStyles = "group relative overflow-hidden focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold transition-colors duration-300";

  const variantStyles = isPrimary 
    ? "bg-ink text-white shadow-soft" 
    : "bg-white/70 text-ink border border-ink/10";

  const fillTransition = { duration: 0.4, ease: "easeOut" };
  const textTransition = { duration: 0.3 };

  return (
    <motion.a
      href={href}
      initial={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {hasSeaFill && (
        <motion.div
          className="absolute inset-0 bg-copper -z-10"
          initial={{ y: "100%" }}
          animate={isHovered ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <motion.span 
        initial={false}
        animate={{ 
          color: isHovered 
            ? "#FFFFFF" 
            : (isPrimary ? "#FFFFFF" : "#111111") 
        }}
        transition={textTransition}
        className="relative z-10 flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}