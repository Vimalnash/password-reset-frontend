import { useState } from "react";
import { useFormik } from "formik";
import { resetPasswordMailingSchema } from "../Schemas/resetpasswordmailing";
import { handleUserPasswordReset } from "../handlers/auth";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import { PageHeader } from "../Components/PageHeader";
import { MenuBar } from "../Components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

// Reset Password Link Mailing to User Regarding Page
export function ResetPasswordMailingPage() {
    const navigate = useNavigate();
    const {setResetLink} = useAppContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const initialValue = {
        email: "",
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initialValue,
        validationSchema: resetPasswordMailingSchema,
        onSubmit: (values, {resetForm}) => {
            handlePasswordReset(values);
            resetForm({values: ""});
        }
    });

    // Forgot Password Reset Link Mailing regarding
    function handlePasswordReset(resetLoginPass) {
        // console.log(resetLoginPass)
        handleUserPasswordReset(resetLoginPass)
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
                setSuccessMessage("");
                setFailureMessage(data.error);
            } else {
                setFailureMessage("");
                setSuccessMessage(data.message);
                setResetLink(
                `/resetpasswordlink?auth=${data.passwordReset}`
                )
            }
        })
    };
    
    return (
        <>
        <MenuBar />
        <Stack direction="column" gap={2} alignItems="center">
            <PageHeader>
                <h2>Reset Password</h2>
                <Typography>You will receive mail only when you Previously Signed with us</Typography>
            </PageHeader>
            <Paper elevation={6} >
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" gap={2} m={2} alignItems="center">
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <Button type="submit">
                        Send Reset Link
                    </Button>
                    <Button className="btn" onClick={() => navigate("/login")}>Back To Login</Button>

                    <div className="text-center">
                        {
                            successMessage? (<Typography variant="h6" sx={{color: "green"}}>{successMessage}</Typography>):("")
                        }
                        {
                            failureMessage? (<Typography variant="h6" sx={{color: "red"}}>{failureMessage}</Typography>):("")
                        }
                    </div>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    </>
    )
};

