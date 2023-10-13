import React, { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = () => {
        const savedUserData = JSON.parse(localStorage.getItem("userData"));
        const { email, password } = formData;


        if (savedUserData && email === savedUserData.email && password === savedUserData.password) {
            sessionStorage.setItem("userData", JSON.stringify(formData));
            navigate("/");
        } else {

            setErrors({ email: "Invalid email or password", password: "Invalid email or password" });
        }
    };

    return (
        <div>

            <form>
                <div className="flex flex-col gap-10 items-center justify-center h-[90vh]">
                    <div className="m-[10px]">
                        <Typography fontSize={'20px'} fontWeight={600} >Login </Typography>
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
                        <Button onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                        <div>
                            <Typography >Don&apos;t have the account ?</Typography>
                        </div>
                        <div>
                            <Link to={'/create-account'}>Create Account</Link>
                        </div>
                    </div>
                </div>
            </form>

        </div>

    );
}

export default Login;
