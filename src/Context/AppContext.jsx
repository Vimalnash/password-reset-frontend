import { createContext, useContext, useState } from "react";

// Initialize AppContext
const AppCtx = createContext(null);

// Setting AppContext Provider and Subscriber
export function AppContext({children}) {
    const [resetLink, setResetLink] = useState("")
    return (
        <AppCtx.Provider value={{resetLink, setResetLink}}>
            {children}
        </AppCtx.Provider>
    )
}

// UseContext implement by calling function
export function useAppContext() {
    return useContext(AppCtx);
}