import { createContext } from "react";
import jwt from "jwt-decode";
import { useState } from "react";

export let UserContext = createContext(null);

export const GetUserFunc = ({ children }) => {

    const [user, setUser] = useState('');

    const getUser = () => {
        let token = localStorage.getItem('userToken');
        let userInfo = jwt(token);
        setUser(userInfo);      
    };

    return (
        <UserContext.Provider value={{getUser,user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}