import { FC } from "react";

interface ErrorMessageProps {
  text: string;
  size?: "sm" | "md" | "lg";
  classNames?: string;
}

const sizes = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

const ErrorMessage: FC<ErrorMessageProps> = ({ text, size = "sm", classNames }) => {
  return <div className={`text-red-500 ${sizes[size]} ${classNames}`}>{text}</div>;
};

export default ErrorMessage;
