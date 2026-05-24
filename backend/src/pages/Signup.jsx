import React from "react";

const Signup = ({ setShowSignup, setShowLogin }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="relative bg-white w-[340px] rounded-[30px] px-6 py-7 shadow-2xl overflow-hidden">

        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-b from-fuchsia-500 to-blue-700 rounded-full"></div>

        <div className="absolute -top-6 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-80"></div>

        <button
          onClick={() => setShowSignup(false)}
          className="absolute top-5 right-5 text-2xl"
        >
          ×
        </button>

        <h2 className="text-[20px] font-bold text-center mt-6 mb-10">
          Sign Up
        </h2>

        <form className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-[12px] outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            // className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-[12px] outline-none"

            
          />

          <input
            type="password"
            placeholder="Password"
            // className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder:text-[12px] outline-none"

          />

          <button
            className="mt-4 bg-gradient-to-r from-fuchsia-600 to-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?
          <span
            onClick={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
            className="text-purple-600 font-semibold cursor-pointer ml-1"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Signup;