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
    SignupData,
    ValidationErrorsObject,
    SignupValidationErrors,
} from "../../shared/config";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [user, setUser] = useState<SignupData>({
        email: "",
        name: "",
        password: "",
    });
    const [signupError, setSignupError] = useState("");
    const [validationErrors, setValidationErrors] =
        useState<SignupValidationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const isValid = Object.keys(validationErrors).length === 0;
    const validateSchema = yup.object().shape({
        email: yup.string().required().email("Email entered incorrectly!"),
        name: yup.string().required(),
        password: yup
            .string()
            .required()
            .min(8, "Password must be at least 8 characters long!"),
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid) {
            try {
                await signup(user);
                navigate("/notes");
            } catch (error) {
                setSignupError(error as string);
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
        setSignupError("");
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
                    label="Name"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    error={
                        user.name.length > 0 && Boolean(validationErrors.name)
                    }
                    helperText={user.name.length > 0 && validationErrors.name}
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
                    Sign up
                </Button>
            </div>
            {signupError && <ErrorMessage error={signupError} />}
        </form>
    );
};

export default Signup;
