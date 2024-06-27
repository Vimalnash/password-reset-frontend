import { useState } from "react"
import { useFormik } from "formik"
import { handleUserSignup } from "../handlers/auth";
import {Button, FormHelperText, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import { PageHeader } from "../Components/PageHeader";
import { MenuBar } from "../Components/MenuBar";
import { signupSchema } from "../Schemas/signup";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// New User SignUp Page
export function SignupPage() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Show Password icon button handling
    function handleClickShowPassword() {
        setShowPassword((show) => !show);
    };
    
    // Mouse Down click on icon button handling
    function handleMouseDownPassword (e) {
        e.preventDefault();
    };

    const initialValue = {
        userName: "",
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
        validationSchema: signupSchema,
        onSubmit: (values, {resetForm}) => {
            handleSignup(values);
            resetForm({values: ""});
        }
    });

    // New User signup api hanlding function
    function handleSignup(signupData) {
        handleUserSignup(signupData)
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setSuccessMessage(data.message);
                setFailureMessage("");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            };
        })
    };

    return (
        <>
        <MenuBar />
        <Stack direction="column" gap={2} alignItems="center">
            <PageHeader>
                <h2>Signup</h2>
            </PageHeader>
            <Paper elevation={6} >
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" gap={2} m={2} alignItems="center">
                    <TextField
                        required
                        id="outlined-required"
                        label="UserName"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.userName && Boolean(errors.userName)}
                        helperText={touched.userName && errors.userName}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                          }}
                    />
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
                        Signup
                    </Button>
                    <div>
                        Already Registered? 
                        <Button  onClick={() => navigate("/login")}>Login</Button>
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

