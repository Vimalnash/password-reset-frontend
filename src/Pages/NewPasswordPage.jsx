import { useState } from "react";
import { useFormik } from "formik";
import {Button, FormHelperText, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import { PageHeader } from "../Components/PageHeader";
import { MenuBar } from "../Components/MenuBar";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { newPasswordSchema } from "../Schemas/newpassword";
import { handleUsersNewPass } from "../handlers/auth";
import { useAppContext } from "../Context/AppContext";

// New Password Setting
export function NewPasswordPage() {
    const navigate = useNavigate();
    const { setResetLink } = useAppContext();

    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Show Password Icon Button Hanlde
    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    // Prevent Mouse down click event
    function handleMouseDownPassword(e) {
        e.preventDefault();
    };

    const initialValue = {
        password: "",
        confirmPassword: ""
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
        validationSchema: newPasswordSchema,
        onSubmit: (values, {resetForm}) => {
            if (values.password == values.confirmPassword) {
                handleNewPass(values);
            } else {
                alert("Passwords did not match!")
            }
            resetForm({values: ""});
        }
    });

    // Getting hash from the url
    let location = useLocation();
    // console.log(location);
    // console.log("fullurl", window.location.href);
    const searchquery = new URLSearchParams(location.search).get("auth");

    function handleNewPass(newPassData) {
        handleUsersNewPass(newPassData, searchquery)
        .then((data) => {
            // console.log(data)
            if(data.error) {
                console.log(data.error);
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setSuccessMessage(data.message);
                setFailureMessage("");
                setTimeout(()=> {
                    navigate("/login");
                    setResetLink("");
                }, 2000)
            }
        })
    };
    
    return (
        <>
        <MenuBar />
        <Stack direction="column" gap={2} alignItems="center">
            <PageHeader>
                <h2>Set New Password</h2>
            </PageHeader>
            <Paper elevation={6} >
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" gap={2} m={2} alignItems="center">
                    <TextField
                        required
                        type="password"
                        id="outlined-password-input"
                        label="Password"
                        autoComplete="current-password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <TextField
                        required
                        type={showPassword ? "text" : "password"}
                        id="outlined-password-input"
                        label="confirmPassword"
                        autoComplete="current-password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            
                        }}
                    />
                    <Button type="submit">
                        Save
                    </Button>
                    <div className="text-center">
                        {
                            successMessage? (<Typography variant="h6" sx={{color: "green"}}>{successMessage}</Typography>):("")
                        }
                        {
                            failureMessage? (<Typography variant="h6" sx={{color: "red"}}>{failureMessage}</Typography>):("")
                        }
                    </div>
                    <FormHelperText id="my-helper-text">We'll never share your details.</FormHelperText>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    </>
    )
};

