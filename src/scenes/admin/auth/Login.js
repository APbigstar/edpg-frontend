import React, { useState } from "react";
import { loginFields } from "../../dummydata";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedin } from "../../../features/auth/auth";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(fieldsState);
  const [errors, setErrors] = useState({});
  const [isAuthorized, setIsAuthorized] = useState("");

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleError = (field, message) => {
    setIsAuthorized("fail");
    setErrors({ ...errors, [field]: message });

    setTimeout(() => {
      setIsAuthorized();
    }, 2000);
  };

  const handleSuccess = (msg) => {
    setIsAuthorized("success");
    setTimeout(() => {
      setIsAuthorized();
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!loginState.email.trim()) {
      validationErrors.email = "Email is required";
      handleError("email", "Email is required");
    }

    if (!loginState.password.trim()) {
      validationErrors.password = "Password is required";
      handleError("password", "Password is required");
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No validation errors, proceed with form submission
      try {
        const { data } = await axios.post(
          `${baseUrl}/auth/login`,
          {
            ...loginState,
            role: "admin",
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          dispatch(setIsLoggedin(true));
          handleSuccess(message);
          localStorage.setItem("admin-login-token", data);
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
        } else {
          handleError("general", message);
        }
      } catch (error) {
        console.log(error);
      }
      setLoginState({
        ...loginState,
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <Stack sx={{ width: "300px", marginTop: "20px" }} spacing={2}>
        {isAuthorized === "success" ? (
          <Alert
            severity="success"
            style={{ backgroundColor: "#e9fbc4", color: "green" }}
          >
            <AlertTitle>Success</AlertTitle>
            Successfully — <strong>Logged In!</strong>
          </Alert>
        ) : isAuthorized === "fail" ? (
          <Alert
            severity="error"
            style={{ backgroundColor: "#ffc2df", color: "red" }}
          >
            <AlertTitle>Error</AlertTitle>
            Failed — <strong>Log In!</strong>
          </Alert>
        ) : (
          ""
        )}
      </Stack>
      <form className="space-y-6 w-1/5">
        <div className="-space-y-px">
          {fields.map((field) => (
            <div key={field.id}>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
                errorMessage={errors[field.id]}
              />
            </div>
          ))}
        </div>
        <div className="action-btns flex items-center justify-around">
          <button
            className="hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            style={{ background: "#1eb2a6" }}
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link to="/admin">
            <button
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              style={{ background: "#1eb2a6" }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
