import React from "react";

export interface ButtonProps {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ id, label, onClick, disabled }: ButtonProps) {
  return (
    <button id={id} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
