import { baseurl, userurl } from "./backendurls";

// New User Signup API Hanlding
export async function handleUserSignup(signupData) {
    const res = await fetch(`${baseurl}/${userurl}/signup`, {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// Existing User Login API hanlding
export async function handleUserLogin(loginData) {
    const res = await fetch(`${baseurl}/${userurl}/login`, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// Forgot Password - Mailing Reset Password Link API
export async function handleUserPasswordReset(resetLoginPass) {
    const res = await fetch(`${baseurl}/${userurl}/resetpassword`, {
        method: "PUT",
        body: JSON.stringify(resetLoginPass),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// User Click Link from mail ->
//  verifying user by hash and then show new password input page
export async function handleResetPassVerifyLink(searchquery) {
    const res = await fetch(`${baseurl}/${userurl}/resetpasswordlink?searchquery=${searchquery}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// New Password setting regarding API handle
export async function handleUsersNewPass(newPassData, searchquery) {
    const res = await fetch(`${baseurl}/${userurl}/resetpassword/setnewpassword?searchquery=${searchquery}`, {
        method: "PUT",
        body: JSON.stringify(newPassData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// get token to api routing hanlding
export function getToken() {
    if (localStorage.getItem("token")) {
        return localStorage.getItem("token");
    }
}

// For Routing verifying if token exist
export function isAccessible() {
    if (localStorage.getItem("token")) {
         return true;
    } else {
        return false;
    }
};

// User Logged In to Portal confirmation
export function isUser() {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.userName) {
            return true;
        } else {
            return false;
        }
    }
};

// Logout handling to remove tokens
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};