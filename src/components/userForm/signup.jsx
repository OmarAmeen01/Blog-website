import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Logo } from "../bridge";
import { useForm } from "react-hook-form";
import authService from "../../appwrite services/auth";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
function SignUp() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const singup = async (data) => {
    setError("");
    try {
      const session = authService.createUser(data);
      if (session) {
        const useData = authService.getCurrentUser();
        if (useData) dispatch(login(useData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-[500px] m-auto   mb-[198px] bg-white p-5 rounded-xl shadow-xl  flex flex-col place-items-center mt-5  ">
      <Logo className="text-center mb-5" />
      <h2 className=" border-b-2 border-black  p-2 font-bold text-xl mb-5 text-center">
        Create an account
      </h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit(singup)}>
        <div className="flex  flex-col  gap-3">
          <Input
            label="Name "
            type="text"
            className="text-lg p-2 rounded-xl border border-black ml-[45px]"
            placeholder="Enter your name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email "
            type="email"
            placeholder="
   Enter your email"
            className="text-lg p-2 rounded-xl border border-black ml-[50px]"
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
            className="text-lg p-2 rounded-xl border border-black ml-4"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <Button type="submit" className=" my-5 mx-[140px]" children="Sign in" />
      </form>
      <p className="text-lg">
        Already have an Account{" "}
        <span className="p-2 text-blue-800 underline font-semibold hover:opacity-75">
          <Link>Sign in</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
