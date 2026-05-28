import React from "react";
import Account from "./Account";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const PleaseLogin = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 flex items-center justify-center">
      <div className="border border-zinc-400 bg-white max-w-[500px] w-full rounded-[60px] shadow-xl py-14 px-10 text-center flex flex-col items-center justify-between h-[450px]">
        {/* Header section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-slate-900 font-stylish font-normal tracking-wide">
            Authentication Required
          </h2>
          <p className="text-xl text-slate-700 font-sans tracking-wide mt-2">
            Please access your account to view your private library dashboard
            configuration.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="w-full max-w-[360px]">
          <NavLink
            to="/login"
            className="w-full h-16 flex items-center justify-center text-3xl bg-[#eef1f6] border border-zinc-700 text-slate-900 rounded-[24px] hover:bg-[#e2e7f0] active:scale-[0.99] transition-all font-stylish"
          >
            Log In
          </NavLink>
        </div>

        {/* Footer Navigation Link */}
        <p className="text-xl text-slate-900 tracking-wide font-sans">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            [
            <span className="underline decoration-1 underline-offset-4 font-stylish text-2xl">
              Sign up
            </span>
            ]
          </NavLink>
        </p>
      </div>
    </div>
  );
};

function AuthLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="w-full h-full">
      {isAuthenticated ? <Account /> : <PleaseLogin />}
    </div>
  );
}

export default AuthLayout;
