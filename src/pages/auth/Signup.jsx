import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import signup_img from "../../assets/image-upload-icon.png";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();
  const navigate = useNavigate(); // navigation hook

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log("User created:", result.user);
        // ✅ Redirect to login page after successful signup
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };

  return (
    <div className="w-full max-w-[448px]">
      {/* Heading */}
      <h1 className="text-[50px] font-extrabold text-gray-900">
        Create an Account
      </h1>
      <p className="text-[20px] text-gray-700">Register with Profast</p>

      {/* Avatar placeholder */}
      <div className="mt-5 mb-2">
        <button className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <img src={signup_img} alt="Upload icon" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        {/* Name */}
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-0"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">Name is required</p>
        )}

        {/* Email */}
        <label className="mt-4 block text-sm font-medium text-gray-800 mb-1">
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

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-[#CFEA68] py-2 text-sm font-semibold text-[#0B3B36] hover:brightness-95 transition"
        >
          Register
        </button>

        {/* Login link */}
        <p className="mt-3 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#7AC70C] hover:underline"
          >
            Login
          </Link>
        </p>

        <SocialLogin />
      </form>
    </div>
  );
};

export default Signup;
