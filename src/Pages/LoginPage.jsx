import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/login";
import { handleUserLogin } from "../handlers/auth";
import {Button, FormHelperText, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import { PageHeader } from "../Components/PageHeader";
import { MenuBar } from "../Components/MenuBar";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// User Login Page
export function LoginPage() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // View Password Icon Button Hanlding
    function handleClickShowPassword() {
        setShowPassword((show) => !show);
    };
    
    // Prevent continuous clickin
    function handleMouseDownPassword (e) {
        e.preventDefault();
    };

    const initialValue = {
        email: "",
        password: ""
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
        validationSchema: loginSchema,
        onSubmit: (values, {resetForm}) => {
            handleLogin(values);
            resetForm({values: ""});
        }
    });

    // User Login Button Handling
    function handleLogin(loginData) {
        handleUserLogin(loginData)
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setSuccessMessage(data.message);
                setFailureMessage("");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
                location.reload();
            }
        })
    };
    

    // Forgot Password Button Hanlde
    function forgotPassword(){
        navigate("/resetpassword");        
    };

    return (
        <>
        <MenuBar />
        <Stack direction="column" gap={2} alignItems="center">
            <PageHeader>
                <h2>Login</h2>
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
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                          }}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
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
                        Login
                    </Button>
                    <Button className="btn" onClick={forgotPassword}>Forgot Password?</Button>
                    <div>
                        Not Registered? 
                        <Button onClick={() => navigate("/signup")}>SignUp</Button>
                    </div>
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

