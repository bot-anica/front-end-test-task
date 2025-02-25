import { FieldProps } from "formik";
import { FC } from "react";
import ErrorMessage from "./ErrorMessage";
import InputField from "./InputField";

interface FormFieldProps {
  type?: "text" | "email" | "password";
}

const FormField: FC<FormFieldProps & FieldProps> = ({
  field,
  form: { touched, errors },
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block text-sm font-medium mb-2">
        Email address
      </label>
      <InputField type={type} {...field} />
      {errors[field.name] && touched[field.name] && (
        <ErrorMessage text={errors[field.name]!.toString()} classNames="mt-1" />
      )}
    </div>
  );
};

export default FormField;
