"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const [position, setPosition] =
    useState<ToasterProps["position"]>("top-center");

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 768) {
        setPosition("bottom-center"); // mobile
      } else {
        setPosition("top-center"); // desktop
      }
    };

    updatePosition(); // initial position
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Sonner
      position={position}
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        style: {
          background: theme === "light" ? "#F0F4FF" : "rgba(0, 0, 0, 0.6)",
          color: theme === "light" ? "#222" : "#fff",
          border:
            theme === "light"
              ? "1px solid #8A2BE2"
              : "1px solid rgba(255,255,255,0.2)",
          backdropFilter: theme === "light" ? undefined : "blur(10px)",
          boxShadow:
            theme === "light"
              ? "0 4px 12px rgba(138, 43, 226, 0.15)"
              : "0 4px 12px rgba(0, 0, 0, 0.4)",
        },
      }}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
