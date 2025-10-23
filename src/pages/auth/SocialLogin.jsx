import React from "react";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();

  const handleGoogleSignin = () => {
    signInGoogle()
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <div>
      {/* Or divider */}
      <div className="my-3 text-center text-sm text-gray-500">Or</div>

      {/* Google button */}
      <button
        onClick={handleGoogleSignin}
        type="button"
        className="w-full rounded-md bg-gray-300 py-2 text-sm text-gray-800 hover:bg-gray-200 transition flex items-center justify-center gap-2"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.64 31.742 29.223 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.84 1.156 7.957 3.043l5.657-5.657C33.537 5.053 28.973 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.653-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.814C14.179 16.218 18.713 13 24 13c3.059 0 5.84 1.156 7.957 3.043l5.657-5.657C33.537 5.053 28.973 3 24 3 16.318 3 9.67 7.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 43c5.166 0 9.65-1.977 12.988-5.178l-5.992-5.061C29.949 34.938 27.179 36 24 36c-5.196 0-9.6-3.317-11.214-7.946l-6.5 5.008C9.593 38.556 16.24 43 24 43z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-1.078 3.213-4.554 7-11.303 7-5.196 0-9.6-3.317-11.214-7.946l-6.5 5.008C9.593 38.556 16.24 43 24 43c11.045 0 20-8.955 20-20 0-1.341-.138-2.653-.389-3.917z"
          />
        </svg>
        Continue with google
      </button>
    </div>
  );
};

export default SocialLogin;
