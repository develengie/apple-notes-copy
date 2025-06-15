import { useState, type ChangeEvent, type FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validator } from "../../shared/lib";
import type { SignupData } from "../../shared/config";

const Signup = () => {
    const [user, setUser] = useState<SignupData>({
        email: "",
        name: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const validateSchema = {
        email: validator.isEmail(user.email),
        name: user.name.length !== 0,
        password: validator.min(user.password),
    };
    const isValid = Object.values(validateSchema).every(
        (item) => item === true
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid) {
            console.log(user);
            setUser({
                email: "",
                name: "",
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
                    label="Name"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    error={!validateSchema.name}
                    helperText={!validateSchema.name ? "Name is required!" : ""}
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
                Sign up
            </Button>
        </form>
    );
};

export default Signup;
