import { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import Signup from "../../features/Signup";
import Signin from "../../features/Signin";

const AuthPage = () => {
    const location = useLocation();
    const { isAuth } = useAuth();
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const from = location.state?.from ?? "/notes";

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    if (isAuth) {
        return <Navigate to={from} />;
    }

    return (
        <div className="page  page--center">
            <div className="container">
                <div className="page__content">
                    {formType === "register" ? (
                        <>
                            <h2 className="page__title">Sign up</h2>
                            <Signup />
                            <p className="text-center">
                                <a
                                    className="toggle-button"
                                    onClick={toggleFormType}
                                    role="button"
                                >
                                    Have an account? Sign in
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="page__title">Sign in</h2>
                            <Signin />
                            <p className="text-center">
                                <a
                                    className="toggle-button"
                                    onClick={toggleFormType}
                                    role="button"
                                >
                                    Don't have an account? Sign up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
