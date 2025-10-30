import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import signup_img from "../../assets/image-upload-icon.png";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate(); // navigation hook
  const axiosInstance = useAxios();

  const [image, setImage] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setImage(URL.createObjectURL(image));
    }

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );

    setProfilePic(res.data.data.url);
  };

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        const userInfo = {
          email: data.email,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogIn: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

        updateUserProfile(userProfile)
          .then(() => {
            console.log("Profile Updated");
          })
          .catch((error) => {
            console.error("error updating profile: ", error);
          });

        console.log(result);
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        {/* Avatar placeholder */}
        <input
          type="file"
          accept="image/*"
          id="avatarInput"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Upload Button */}
        <label
          htmlFor="avatarInput"
          className="h-12 w-12 mt-5 mb-2 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
        >
          {image ? (
            <img
              src={image}
              alt="Uploaded avatar"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <img src={signup_img} alt="Upload icon" />
          )}
        </label>

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
