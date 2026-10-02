"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleRoute = (e) => {
    e.preventDefault();
    router.replace("/shop/dashboard");
  };

  const handleRefresh = () => {
    router.refresh();
  };

  const handleBackward = () => {
    router.back();
  };

  const handleForward = () => {
    router.forward();
  };

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <button
        onClick={(e) => handleRoute(e)}
        className="border p-2 bg-gray-800 border-gray-600 hover:cursor-pointer"
      >
        Route
      </button>

      <button className="border p-2 bg-gray-800 border-gray-600 hover:cursor-pointer" onClick={() => handleRefresh()}>Refresh</button>


      <div className="flex gap-4 ">
        <button onClick={() => handleBackward()}>Backward</button>
        <button onClick={() => handleForward()}>Forward</button>
      </div>
    </div>
  );
};

export default page;
