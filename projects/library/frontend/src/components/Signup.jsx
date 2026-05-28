import React from "react";
import { NavLink } from "react-router";

function Signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="border border-zinc-400 bg-white h-[600px] w-[600px] rounded-[60px] shadow-xl flex flex-col items-center justify-between py-12 px-12 text-center font-sans font-stylish">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl text-slate-900 tracking-wide font-normal">
            Create Account
          </h1>
          <p className="text-xl text-slate-800 tracking-wide mt-1">
            Join our library system to start exploring books
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col gap-4 max-w-[440px]"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 px-6 text-xl border-2 border-zinc-500 rounded-[24px] placeholder-zinc-400 focus:outline-none focus:border-slate-800 transition-colors"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-6 text-xl border-2 border-zinc-500 rounded-[24px] placeholder-zinc-400 focus:outline-none focus:border-slate-800 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 px-6 text-xl border-2 border-zinc-500 rounded-[24px] placeholder-zinc-400 focus:outline-none focus:border-slate-800 transition-colors"
          />
          <button
            type="submit"
            className="w-full h-16 mt-2 text-3xl bg-[#eef1f6] border border-zinc-700 text-slate-900 rounded-[32px] hover:bg-[#e2e7f0] active:scale-[0.99] transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Section */}
        <p className="text-2xl text-slate-900 tracking-wide">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            [
            <span className="underline decoration-1 underline-offset-4">
              Log in
            </span>
            ]
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
