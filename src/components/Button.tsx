import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  disabled = false,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-1 rounded-lg  ${className}`}
  >
    {children}
  </button>
);

export default Button;
