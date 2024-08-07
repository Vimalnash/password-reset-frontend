import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is Required"),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required("Password is Required")
});