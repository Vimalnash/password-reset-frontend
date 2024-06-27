import * as yup from "yup";

export const signupSchema = yup.object({
    userName: yup.string().required("UserName is Required"),
    email: yup.string().email("Enter a valid email").required("Email is Required"),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required()
});