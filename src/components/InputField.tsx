import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type?: "text" | "email" | "password";
  classNames?: string;
}

const InputField: FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  name,
  type = "text",
  classNames,
}) => {
  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${classNames}`}
    />
  );
};

export default InputField;
