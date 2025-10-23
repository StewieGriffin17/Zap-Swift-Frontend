import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // get the route user came from, default to home
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log("Logged in:", result.user);
        navigate(from, { replace: true }); // go back to previous page
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="w-full max-w-[448px]">
      {/* Heading */}
      <h1 className="text-[50px] font-extrabold text-gray-900">Welcome Back</h1>
      <p className="text-[20px] text-gray-700">Login with Profast</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Email */}
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-0"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">Email is required</p>
        )}

        {/* Password */}
        <label className="mt-4 block text-sm font-medium text-gray-800 mb-1">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-0"
        />
        {errors.password?.type === "required" && (
          <p className="mt-1 text-xs text-red-500">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="mt-1 text-xs text-red-500">
            Password must be at least 6 characters
          </p>
        )}

        {/* Forgot */}
        <div className="mt-2">
          <button
            type="button"
            className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-800"
          >
            Forget Password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-[#CFEA68] py-2 text-sm font-semibold text-[#0B3B36] hover:brightness-95 transition"
        >
          Login
        </button>

        {/* Register link */}
        <p className="mt-3 text-sm text-gray-600">
          Don't have any account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#7AC70C] hover:underline"
          >
            Register
          </Link>
        </p>

        <SocialLogin />
      </form>
    </div>
  );
};

export default Login;
