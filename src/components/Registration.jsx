import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState
        ({
            email: "",
            password: ""
        });
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = () => {
        const newErrors = { email: "", password: "" };

        if (!isEmailValid(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!isPasswordValid(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            localStorage.setItem("userData", JSON.stringify(formData));
            navigate('/login')
        }
    };

    return (
        <div>

            <form>
                <div className="flex flex-col gap-10 items-center justify-center h-[90vh]">
                    <div className="m-[10px]">
                        <Typography fontSize={'20px'} fontWeight={600} >Create a Account</Typography>
                    </div>
                    <div>
                        <TextField
                            sx={{ width: '30vw' }}
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ width: '30vw' }}
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                    </div>
                    <div>
                        <Button onClick={handleRegistration}>
                            Register
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
