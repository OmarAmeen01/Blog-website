import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../../appwrite services/auth";
import { Button, Input, Logo } from "../bridge";
import { login as authLogin } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          location.reload();
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="max-w-md m-auto   mb-[198px] bg-white p-5 rounded-xl shadow-xl  flex flex-col place-items-center mt-5  ">
      <Logo className="text-center mb-5" />
      <h2 className=" border-b-2 border-black  p-2 font-bold text-xl mb-5 text-center">
        Sign into your account
      </h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <div className="flex  flex-col  gap-3">
          <Input
            label="Email "
            type="email"
            className="text-lg max-[520px]:mt-3 p-2 rounded-xl border border-black ml-[50px]"
            placeholder="
   Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /\w+/.test(value) || "Enter a valid email",
              },
            })}
          />

          <Input
            label="Password "
            type="password"
            placeholder="Type a password"
            className="text-lg max-[520px]:mt-3 p-2 rounded-xl border border-black ml-4 max-[406px]:ml-12"
            {...register("password", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /\w+/.test(value) || "Enter a valid password",
              },
            })}
          />
        </div>

        <div className="flex">
          {" "}
          <Button type="submit" className=" my-5 m-auto" children="Sign in" />
        </div>
      </form>
      <p className="text-lg">
        Already have an account
        <span className="p-2 text-blue-800 underline font-semibold hover:opacity-75">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </div>
  );
}

export default Login;
