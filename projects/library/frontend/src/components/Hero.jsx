import React from "react";
import { NavLink } from "react-router";
import library from "../assets/Hero/library-books.png";

function Hero() {
  return (
    <div className="flex justify-center gap-10 items-center h-full w-full">
      <div className=" flex flex-col gap-10 justify-center h-[80%]">
        <div className="font-stylish text-7xl flex flex-col gap-3">
          <span>Explore and</span> <span>create</span>{" "}
          <span>your catalog</span>{" "}
        </div>
        <div className="font-stylish border rounded-2xl text-3xl  bg-zinc-200 w-40 h-14 flex items-center justify-center">
          <NavLink to="/login">Let's start</NavLink>
        </div>
      </div>
      <div className=" h-[100%] pb-20 flex  justify-center">
        <img className="" src={library} alt="" />
      </div>
    </div>
  );
}

export default Hero;
