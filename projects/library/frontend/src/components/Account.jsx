import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router";

function Account() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock static user history data metrics
  const userStats = [
    { label: "Books Borrowed", value: "14" },
    { label: "Active Overdues", value: "0" },
    { label: "Reviews Submitted", value: "6" },
  ];

  const readingHistory = [
    {
      title: "Designing Data-Intensive Applications",
      date: "Borrowed: May 12, 2026",
      status: "Active",
    },
    {
      title: "Atomic Habits",
      date: "Returned: April 28, 2026",
      status: "Completed",
    },
    {
      title: "The Psychology of Money",
      date: "Returned: March 15, 2026",
      status: "Completed",
    },
  ];

  const handleLogoutAction = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Guard Clause: Render Fallback Frame if state registry registers as unauthenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6 flex items-center justify-center">
        <div className="border border-zinc-400 bg-white max-w-md w-full rounded-[40px] shadow-xl p-10 text-center flex flex-col gap-6">
          <h2 className="text-4xl font-stylish text-slate-900">
            Session Expired
          </h2>
          <p className="text-zinc-600 font-sans">
            Please log in to your library credentials to view your profile
            dashboard configuration.
          </p>
          <NavLink
            to="/login"
            className="w-full py-4 text-2xl bg-[#eef1f6] border border-zinc-700 text-slate-900 rounded-[24px] hover:bg-[#e2e7f0] block text-center font-stylish transition-all"
          >
            Go to Login
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center">
      {/* Outer Theme Frame */}
      <div className="w-[98%] max-w-[1200px] border border-zinc-400 bg-white rounded-[60px] shadow-xl py-14 px-12 flex flex-col gap-10 mt-4">
        {/* Profile Identity Row Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            {/* Avatar Circle Placeholder */}
            <div className="w-20 h-20 bg-zinc-300 border border-zinc-400 text-slate-800 text-4xl rounded-full flex items-center justify-center font-stylish select-none uppercase">
              {user.name ? user.name.charAt(0) : user.email.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl text-slate-900 font-stylish font-normal">
                {user.name || "Library Member"}
              </h1>
              <p className="text-zinc-500 font-sans text-lg mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogoutAction}
            className="p-2 border border-red-300 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 px-6 font-stylish text-lg transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>

        {/* User Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {userStats.map((stat, idx) => (
            <div
              key={idx}
              className="border border-zinc-300 bg-zinc-50 rounded-[28px] p-6 text-center shadow-xs"
            >
              <span className="block text-4xl font-normal text-slate-900 font-stylish mb-1">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
          {/* Main Activity Log Column */}
          <div className="md:col-span-2 border border-zinc-300 bg-zinc-50 p-8 rounded-[40px] flex flex-col gap-5">
            <h2 className="text-3xl text-slate-900 font-stylish">
              Recent Activity
            </h2>

            <div className="flex flex-col gap-3">
              {readingHistory.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-lg font-sans font-medium text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono text-zinc-400 mt-0.5 block">
                      {item.date}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full border ${
                      item.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Account System Configuration Details Column */}
          <div className="border border-zinc-300 bg-zinc-50 p-8 rounded-[40px] flex flex-col gap-4">
            <h2 className="text-3xl text-slate-900 font-stylish">
              System Metadata
            </h2>

            <div className="flex flex-col gap-3 font-mono text-xs text-zinc-600 mt-2">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span>Account Tier:</span>
                <span className="text-slate-900 font-medium">Standard</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span>Pass Status:</span>
                <span className="text-emerald-600 font-medium">Valid</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span>Session Node:</span>
                <span className="text-slate-900">Local-Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
