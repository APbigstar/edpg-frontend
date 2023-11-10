import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

export default function Input({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired = false,
    placeholder,
    customClass,
    errorMessage,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <TextField
                variant="filled"
                onChange={handleChange}
                value={value}
                id={id}
                name={name}
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                required={isRequired}
                className={fixedInputClass + customClass}
                label={placeholder}
                error={Boolean(errorMessage)}
                helperText={errorMessage}
                InputProps={
                    type === 'password'
                        ? {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleVisibility}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                        : undefined
                }
            />

        </div>
    );
}
