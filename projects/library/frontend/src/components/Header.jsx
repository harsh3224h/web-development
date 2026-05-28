import React from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Header() {
  const navItems = [
    {
      id: "01",
      text: "Books",
      reference: "/books",
    },
    {
      id: "02",
      text: "About",
      reference: "/about",
    },
  ];
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="mt-3 pl-10 pr-30 w-[98%] mx-auto h-[65px] bg-zinc-100 border rounded-2xl flex items-center justify-between">
      <div>
        <NavLink to="/">
          <img className="h-15" src={logo} alt="Logo" />
        </NavLink>
      </div>
      <div className="flex gap-4 ">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="
          p-2 border rounded-2xl bg-zinc-300 px-4 font-stylish text-xl
          "
          >
            <NavLink to={item.reference}>{item.text}</NavLink>
          </div>
        ))}
        {!isAuthenticated && (
          <div
            className="
          p-2 border rounded-2xl bg-zinc-300 px-4 font-stylish text-xl
          "
          >
            <NavLink to="/login">Log In</NavLink>
          </div>
        )}
        {isAuthenticated && (
          <div
            className="
          p-2 border rounded-2xl bg-zinc-300 px-4 font-stylish text-xl
          "
          >
            <NavLink to="/account">My Account</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
