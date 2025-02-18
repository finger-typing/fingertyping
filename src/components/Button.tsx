import React from "react";

// Define the props interface for the Button component
interface ButtonProps {
  onClick: () => void; // Function to be called when the button is clicked
  className?: string; // Optional additional CSS classes
  disabled?: boolean; // Optional flag to disable the button
  children: React.ReactNode; // Content to be rendered inside the button
}

// A reusable Button component that can be customized with additional classes and disabled state
const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "", // Default to empty string if no additional classes are provided
  disabled = false, // Default to enabled if not specified
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-lg px-4 py-1 ${className}`} // Combine default and custom classes
  >
    {children}
  </button>
);

export default Button;
