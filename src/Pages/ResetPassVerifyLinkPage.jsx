
import { useLocation, useNavigate } from "react-router-dom";
import { handleResetPassVerifyLink } from "../handlers/auth";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// Reset Password Link Handling When User Clicks
export function ResetPassVerifyLinkPage() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [Loading, setLoading] = useState(true);


    let location = useLocation();
    const searchquery = new URLSearchParams(location.search).get("auth");

    useEffect(() => {
        handleResetPassVerifyLink(searchquery)
        .then((data) => {
            // console.log(data)
            if(data.error) {
                console.log(data.error);
                setTimeout(() => {
                    setLoading(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error);
                }, 3000)
            } else {
                setTimeout(()=> {
                    setLoading(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                    navigate(`/resetpassword/setnewpassword?auth=${searchquery}`);
                }, 3000)
            }
        })
    }, []);

    return (
        <>
            <div style={{textAlign:"center"}}>
                {   Loading && (
                    <Typography variant="h6" sx={{color: "green"}}>Processing Please Wait ...</Typography>
                )}
                {
                    successMessage? (<Typography variant="h6" sx={{color: "green"}}>{successMessage}</Typography>):("")
                }
                {
                    failureMessage? (<Typography variant="h6" sx={{color: "red"}}>{failureMessage}</Typography>):("")
                }
            </div>
        </>
    )
};

