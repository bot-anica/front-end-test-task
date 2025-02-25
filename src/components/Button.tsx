import { FC, ReactNode } from "react";

import Loader from "./Loader";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button: FC<ButtonProps> = ({ children, isLoading, type = "button" }) => {
  return (
    <button
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      type={type}
    >
      {isLoading && <Loader color="secondary" size="sm" />}
      {children}
    </button>
  );
};

export default Button;
