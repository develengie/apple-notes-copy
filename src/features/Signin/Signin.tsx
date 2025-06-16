import { useState, type ChangeEvent, type FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validator } from "../../shared/lib";
import type { SigninData } from "../../shared/config";

interface SigninProps {
    onSubmit: (user: SigninData) => void;
}

const Signin = ({ onSubmit }: SigninProps) => {
    const [user, setUser] = useState<SigninData>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const validateSchema = {
        email: validator.isEmail(user.email),
        password: validator.min(user.password),
    };
    const isValid = Object.values(validateSchema).every(
        (item) => item === true
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid) {
            onSubmit(user);
            setUser({
                email: "",
                password: "",
            });
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
            <Button
                fullWidth
                disabled={!isValid}
                type="submit"
                variant="contained"
            >
                Sign in
            </Button>
        </form>
    );
};

export default Signin;
