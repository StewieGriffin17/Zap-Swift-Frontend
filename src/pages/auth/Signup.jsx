import React from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import signup_img from "../../assets/image-upload-icon.png"


const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("signup data:", data);
  };

  return (
    <div className="w-full max-w-[448px]">
      {/* Heading */}
      <h1 className="text-[50px] font-extrabold text-gray-900">Create an Account</h1>
      <p className="text-[20px] text-gray-700">Register with Profast</p>

      {/* Avatar placeholder */}
      <div className="mt-5 mb-2">
        <button className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <img src={signup_img} alt="" />
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
          <a href="/login" className="font-semibold text-[#7AC70C] hover:underline">
            Login
          </a>
        </p>

        {/* Or divider */}
        <div className="my-3 text-center text-sm text-gray-500">Or</div>

        {/* Google button */}
        <button
          type="button"
          className="w-full rounded-md bg-gray-100 py-2 text-sm text-gray-800 hover:bg-gray-200 transition flex items-center justify-center gap-2"
        >
          <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.64 31.742 29.223 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.84 1.156 7.957 3.043l5.657-5.657C33.537 5.053 28.973 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.653-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.814C14.179 16.218 18.713 13 24 13c3.059 0 5.84 1.156 7.957 3.043l5.657-5.657C33.537 5.053 28.973 3 24 3 16.318 3 9.67 7.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 43c5.166 0 9.65-1.977 12.988-5.178l-5.992-5.061C29.949 34.938 27.179 36 24 36c-5.196 0-9.6-3.317-11.214-7.946l-6.5 5.008C9.593 38.556 16.24 43 24 43z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.078 3.213-4.554 7-11.303 7-5.196 0-9.6-3.317-11.214-7.946l-6.5 5.008C9.593 38.556 16.24 43 24 43c11.045 0 20-8.955 20-20 0-1.341-.138-2.653-.389-3.917z"/>
          </svg>
          Register with google
        </button>
      </form>
    </div>
  );
};

export default Signup;
