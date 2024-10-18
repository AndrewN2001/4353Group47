import React, {useState, useContext, createContext, useEffect} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedUser")
        const storedAdmin = localStorage.getItem("isAdmin");
        if (storedUser) {
            setLoggedUser(storedUser);
            setLoggedIn(true);
            if (storedAdmin === "true"){
                setIsAdmin(true);
            } else{
                setIsAdmin(false);
            }
        }
        setLoading(false);
    }, []);

    const login = (name) => {
        setLoggedIn(true);
        setLoggedUser(name);
        localStorage.setItem("loggedUser", name);
    }

    const logout = () => {
        setLoggedIn(false);
        setLoggedUser(null);
        setIsAdmin(false);
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("isAdmin");
    }

    const setAdmin = (state) => {
        setIsAdmin(state);
        localStorage.setItem("isAdmin", state ? "true": "false");
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, loggedUser, login, logout, setIsAdmin, isAdmin, setAdmin}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}