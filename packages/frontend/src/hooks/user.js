import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiUrl } from "../util";
import { useNavigate } from "react-router-dom";

// No token stored in local store
const NO_TOKEN_ERR = "no_token";

const UserContext = createContext(null);
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    
    // Obtain new data
    const revalidate = () => {
        // Obtain local JWT val
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            setError(NO_TOKEN_ERR);
            return;
        }
        const init = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Fetch that thing
        fetch(getApiUrl("/user/@me"), init) //line 29
            .then(res => res.json())
            .then(({ user }) => setUser(user))
            .catch((e) => setError(e.message))
            .finally(() => setFetching(false))
    }

    useEffect(() => {
        revalidate();
    }, []);
    return (
        <UserContext.Provider value={{ user, fetching, error, revalidate }}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    return useContext(UserContext);
}

const useLogout = () => {
    const navigate = useNavigate();
    
    return () => {
        localStorage.removeItem("jwt");
        navigate("/login");
    }
}

export {
    useUser,
    useLogout,
    UserProvider,
    NO_TOKEN_ERR
}
