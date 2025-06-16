import { useState } from "react";
import { useParams } from "react-router-dom";
import Signup from "../../features/Signup";
import Signin from "../../features/Signin";
import type { SigninData, SignupData } from "../../shared/config";

const AuthPage = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    const handleSubmit = (data: SignupData | SigninData) => {
        console.log(data);
    };

    return (
        <div className="page  page--center">
            <div className="container">
                <div className="page__content">
                    {formType === "register" ? (
                        <>
                            <h2 className="page__title">Sign up</h2>
                            <Signup onSubmit={handleSubmit} />
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
                            <Signin onSubmit={handleSubmit} />
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
