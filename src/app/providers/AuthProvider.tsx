import { createContext, use, useState, type ReactNode } from "react";
import { axiosAuth } from "../axios";
import { axios } from "../axios";
import { localStorageService } from "../../shared/services";
import type { AxiosError } from "axios";
import type {
    SigninData,
    SigninResponse,
    SignupData,
    SignupResponse,
} from "../../shared/config";

interface Auth {
    isAuth: boolean;
    signin: (userData: SigninData) => void;
    signup: (userData: SignupData) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({} as Auth);

export const useAuth = () => {
    return use(AuthContext);
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState(
        Boolean(localStorage.getItem("jwt-id-token") ?? "")
    );

    const signin = async (userData: SigninData) => {
        try {
            const { data } = await axiosAuth.post<SigninResponse>(
                "accounts:signInWithPassword",
                {
                    ...userData,
                    returnSecureToken: true,
                }
            );
            const { data: user } = await axios.get(
                `users/${data.localId}.json`
            );
            localStorageService.setAuthData({ ...data, name: user.name });
            setIsAuth(Boolean(localStorage.getItem("jwt-id-token") ?? ""));
        } catch (e: unknown) {
            const error = e as AxiosError;
            throw error.message;
        }
    };

    const signup = async (userData: SignupData) => {
        try {
            const { data } = await axiosAuth.post<SignupResponse>(
                "accounts:signUp",
                {
                    ...userData,
                    returnSecureToken: true,
                }
            );
            const newUser = {
                _id: data.localId,
                email: userData.email,
                name: userData.name,
            };
            await axios.put(`users/${newUser._id}.json`, newUser);
            localStorageService.setAuthData({ ...data, name: newUser.name });
            setIsAuth(Boolean(localStorage.getItem("jwt-id-token") ?? ""));
        } catch (e: unknown) {
            const error = e as AxiosError;
            throw error.message;
        }
    };

    const logout = () => {
        localStorageService.removeAuthData();
        setIsAuth(false);
    };

    const value = {
        isAuth,
        signin,
        signup,
        logout,
    };

    return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
