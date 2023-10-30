import { useState } from "react";
import { signupFields } from "../../dummydata";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const navigate = useNavigate();

  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          ...signupState,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        // handleSuccess(message);
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        // handleError(message);
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
  };

  return (
    <>
      <form className="w-1/5 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
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
            />
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
