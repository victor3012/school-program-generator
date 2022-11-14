import { createContext, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../services/api";
import * as service from "../services/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            try {
                const res = await service.persistentLogin();

                setUser(res);
            } catch (err) {
                setUser(null);
                throw err;
            }
        })()
    }, []);

    const login = async (body) => {
        const res = await service.login(body)

        setUser(res);

        return res;
    }

    const register = async (body) => {
        const res = await service.register(body)

        setUser(res);

        return res;
    }

    const logout = async () => {
        setUser(null);

        await service.logout();
    }

    const isAdmin = () => {
        //TODO
    }

    return (
        <AuthContext.Provider value={{
            user,
            login, register, logout,
            isAuth: Boolean(user?.[ACCESS_TOKEN]),
            authLoaded: (user !== undefined),
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}