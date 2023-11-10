import React, { useState } from "react";
import { signupFields } from "../../dummydata";
import Input from "../../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  const [signupState, setSignupState] = useState(fieldsState);
  const [errors, setErrors] = useState({});
  const [isAuthorized, setIsAuthorized] = useState("");

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
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

    if (!signupState.username.trim()) {
      validationErrors.username = "Name is required";
      handleError("username", "Name is required");
    }

    if (!signupState.email.trim()) {
      validationErrors.email = "Email is required";
      handleError("email", "Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(signupState.email)) {
      validationErrors.email = "Invalid email format";
      handleError("email", "Invalid email format");
    }

    if (!signupState.password.trim()) {
      validationErrors.password = "Password is required";
      handleError("password", "Password is required");
    } else if (signupState.password.length < 8) {
      validationErrors.password = "Input over 8 characters";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/auth/signup`,
          {
            ...signupState,
            role: "user",
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/signin");
          }, 1500);
        } else {
          handleError("general", message);
        }
      } catch (error) {
        console.log(error);
      }
      setSignupState({
        ...signupState,
        email: "",
        password: "",
        username: "",
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
            Successfully — <strong>Sign Up!</strong>
          </Alert>
        ) : isAuthorized === "fail" ? (
          <Alert
            severity="error"
            style={{ backgroundColor: "#ffc2df", color: "red" }}
          >
            <AlertTitle>Error</AlertTitle>
            Failed — <strong>Sign Up!</strong>
          </Alert>
        ) : (
          ""
        )}
      </Stack>
      <form className="w-1/5 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <div key={field.id}>
              <Input
                key={field.id}
                handleChange={handleChange}
                value={signupState[field.id]}
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
          <div className="action-btns flex items-center justify-around">
            <button
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              style={{ background: "#1eb2a6" }}
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <Link to="/signin">
              <button
                className="hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                style={{ background: "#1eb2a6" }}
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
