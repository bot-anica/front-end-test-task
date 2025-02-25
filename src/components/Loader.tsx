import { FC } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const borders = {
  sm: "border-2",
  md: "border-4",
  lg: "border-8",
}

const colors = {
  primary: "text-blue-600",
  secondary: "text-white",
};

const Loader: FC<LoaderProps> = ({ size = "md", color = "primary" }) => {
  return (
    <div
      className={`animate-spin inline-block ${sizes[size]} ${borders[size]} border-current border-t-transparent ${colors[color]} rounded-full`}
    />
  );
};

export default Loader;
