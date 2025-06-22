import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as yup from "yup";
import { ValidationError } from "yup";
import { ErrorMessage } from "../../shared/ui";
import type {
    SigninData,
    ValidationErrorsObject,
    SigninValidationErrors,
} from "../../shared/config";

const Signin = () => {
    const navigate = useNavigate();
    const { signin } = useAuth();
    const [user, setUser] = useState<SigninData>({
        email: "",
        password: "",
    });
    const [signinError, setSigninError] = useState("");
    const [validationErrors, setValidationErrors] =
        useState<SigninValidationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const isValid = Object.keys(validationErrors).length === 0;
    const validateSchema = yup.object().shape({
        email: yup.string().required().email("Email entered incorrectly!"),
        password: yup
            .string()
            .required()
            .min(8, "Password must be at least 8 characters long!"),
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid) {
            try {
                await signin(user);
                navigate("/notes");
            } catch (error) {
                setSigninError(error as string);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const validate = async () => {
        setValidationErrors({});

        try {
            await validateSchema.validate(user, { abortEarly: false });
        } catch (e: unknown) {
            const error = e as ValidationError;
            const validationErrors: ValidationErrorsObject = {};

            error.inner.forEach((e) => {
                validationErrors[e.path!] = e.message;
            });

            setValidationErrors(validationErrors);
        }
    };

    useEffect(() => {
        validate();
        setSigninError("");
    }, [user]);

    return (
        <form className="form  form--mb" onSubmit={handleSubmit}>
            <div className="form__group">
                <TextField
                    fullWidth
                    required
                    label="Email"
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={
                        user.email.length > 0 && Boolean(validationErrors.email)
                    }
                    helperText={user.email.length > 0 && validationErrors.email}
                />
            </div>
            <div className="form__group">
                <TextField
                    fullWidth
                    required
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    error={
                        user.password.length > 0 &&
                        Boolean(validationErrors.password)
                    }
                    helperText={
                        user.password.length > 0 && validationErrors.password
                    }
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            ),
                        },
                    }}
                />
            </div>
            <div className="form__group">
                <Button
                    fullWidth
                    disabled={!isValid}
                    type="submit"
                    variant="contained"
                >
                    Sign in
                </Button>
            </div>
            {signinError && <ErrorMessage error={signinError} />}
        </form>
    );
};

export default Signin;
