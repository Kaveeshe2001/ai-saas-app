import { createContext, useEffect, useState } from "react";
import type { UserProfile } from "../models/User"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loginAPI, registerAPI } from "../services/AuthServices";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    id: string | null;
    registerUser: (
        email: string,
        username: string,
        password: string
    ) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

interface Props {
    children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>(
    {} as UserContextType
);

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        if (user && token && id) {
            setUser(JSON.parse(user));
            setToken(token);
            setId(id);
            axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        email: string,
        username: string,
        password: string 
    ) => {
        await registerAPI(email, username, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem('token', res?.data.token);
                    localStorage.setItem('id', res?.data.id);
                    const userObj = {
                        userName: res?.data.userName,
                        email: res?.data.email,
                    };
                    localStorage.setItem('user', JSON.stringify(userObj));
                    setToken(res?.data.token);
                    setUser(userObj!);
                    setId(res?.data.id);
                    toast.success('Account Created Successfully');
                    navigate('/');
                }
            }) 
            .catch((e) => toast.warning('Server Error Occured' + e));
    };

    const loginUser = async (username: string, password: string) => {
        try {
            const res = await loginAPI(username, password);

            if (res) {
                localStorage.setItem('token', res?.data.token);
                localStorage.setItem('id', res?.data.id);
                const userObj = {
                  userName: res?.data.userName,
                  email: res?.data.email,
                };
                localStorage.setItem('user', JSON.stringify(userObj));

                setToken(res?.data.token);
                setUser(userObj!);
                toast.success('Login Success');
                navigate('/');
            }
        } catch (e) {
            toast.warning('Server Error Occured' + e);
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        setUser(null);
        setId('');
        setToken('');
        navigate('/');
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser, id }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};