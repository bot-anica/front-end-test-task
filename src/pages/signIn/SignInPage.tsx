import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";

import { loginUser } from "../../store/slices/authSlice";
import { validationSchema } from "./formValidation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FormField, Button, ErrorMessage } from "../../components";

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: "",
  password: "",
};

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error, status } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (values: SignInFormValues) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign In
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                type="email"
                label="Email address"
                name="email"
                component={FormField}
                placeholder="Email..."
                required
              />
              <Field
                type="password"
                label="Password"
                name="password"
                component={FormField}
                placeholder="Password..."
                required
              />

              <Button type="submit" isLoading={status === "loading"}>
                Sign In
              </Button>

              {error && <ErrorMessage text={error} classNames="mt-1" />}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
