"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface ButtonProps {
  value: string;
  type: string;
  style?: string;
  navigate?: string;
}

const Button: React.FC<ButtonProps> = ({ value, type, style, navigate }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    if (pathname === "/") {
      handleScroll(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      {navigate ? (
        <button
          onClick={(e) => handleNavClick(e, navigate)}
          className={`uppercase font-heading font-[500] text-xl rounded-full px-6 py-3 shadow-lg ${
            type === "filled"
              ? "bg-golden text-black border border-primary"
              : "bg-transparent text-white border border-white"
          } ${style}`}
        >
          {value}
        </button>
      ) : (
        <button
          className={`uppercase font-heading font-[500] text-xl rounded-full px-6 py-3 shadow-lg ${
            type === "filled"
              ? "bg-golden text-black border border-primary"
              : "bg-transparent text-white border border-white"
          } ${style}`}
        >
          {value}
        </button>
      )}
    </>
  );
};

export default Button;
