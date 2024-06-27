import { Typography } from "@mui/material";
import { MenuBar } from "../Components/MenuBar";
import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

// Home Page View
export function HomePage(){
    const {resetLink} = useAppContext();

    return (
        <>
            <MenuBar />
            <Typography variant="h5" sx={{textAlign: "center"}}>
                Welcome to Password Reset Process Checking
                <Typography p={2}>
                    Go To Signup
                    - Signup with your correct EmailId
                </Typography>
                <Typography p={2}>
                    Go To LoginPage
                    - Click on "Forgot Password" to check
                </Typography>
                {
                    resetLink ?
                    (  
                    <Typography id="resetlink" p={2}>
                        ResetLink
                        - <Link to={resetLink}>ClickHere-ResetPassword</Link>
                    </Typography>)
                    :
                    ("")
                }

            </Typography>
        </>
    )
};

