import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validator } from "../../shared/lib";
import { ErrorMessage } from "../../shared/ui";
import type { SigninData } from "../../shared/config";

const Signin = () => {
    const navigate = useNavigate();
    const { signin } = useAuth();
    const [user, setUser] = useState<SigninData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const validateSchema = {
        email: validator.isEmail(user.email),
        password: validator.min(user.password),
    };
    const isValid = Object.values(validateSchema).every(
        (item) => item === true
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid) {
            try {
                await signin(user);
                navigate("/notes");
            } catch (error) {
                setError(error as string);
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

    useEffect(() => {
        setError("");
    }, [user]);

    return (
        <form className="form  form--mb" onSubmit={handleSubmit}>
            <div className="form__group">
                <TextField
                    fullWidth
                    required
                    label="Email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={!validateSchema.email}
                    helperText={!validateSchema.email ? "Invalid email!" : ""}
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
                    error={!validateSchema.password}
                    helperText={
                        !validateSchema.password
                            ? "Password must be at least 8 characters long!"
                            : ""
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
            {error && <ErrorMessage error={error} />}
        </form>
    );
};

export default Signin;
