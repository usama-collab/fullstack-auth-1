import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAuth } from "../../redux/authSlice";
import { AuthenticatorForm } from "./AuthenticatorForm";
import LoginForm from "./LoginForm";

export const Login = () => {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState<{
        id: number;
        secret?: string;
        otpauth_url?: string;
    }>({
        id: 0,
    });

    const success = () => {
        setRedirect(true);
        dispatch(setAuth(true));
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    let form;

    if (loginData?.id === 0) {
        form = <LoginForm loginData={setLoginData} />;
    } else {
        form = <AuthenticatorForm loginData={loginData} success={success} />;
    }

    return <main className="form-signin w-100 m-auto">{form}</main>;
};
