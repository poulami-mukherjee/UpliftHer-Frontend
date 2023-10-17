import * as Yup from "yup";

// https://github.com/jquense/yup
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Please enter an email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters "),
});
