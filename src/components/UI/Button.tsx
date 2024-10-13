import React, { ReactElement } from "react";

interface IProps {
  type?: "button" | "submit" | "reset";
  children: ReactElement | string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<IProps> = ({
  type = "button",
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        "py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700  focus:outline-none duration-300 " +
        className
      }
    >
      {children}
    </button>
  );
};

export default Button;
