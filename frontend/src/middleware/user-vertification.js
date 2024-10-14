import React, {useState, useContext, createContext, useEffect} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("loggedUser")
        const storedAdmin = localStorage.getItem("isAdmin");
        if (storedUser) {
            setLoggedUser(storedUser);
            setLoggedIn(true);
            if (storedAdmin === "true"){
                setIsAdmin(true);
            }
        }
    }, []);

    const login = (name) => {
        setLoggedIn(true);
        setLoggedUser(name);
        localStorage.setItem("loggedUser", name);
    }

    const logout = () => {
        setLoggedIn(false);
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("isAdmin");
    }

    const setAdmin = (state) => {
        setIsAdmin(state);
        localStorage.setItem("isAdmin", true);
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, loggedUser, login, logout, setIsAdmin, isAdmin, setAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}