"use client";

import React from "react";
import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();
  return (
    <div>
      <h2>PathName: {pathname}</h2>
    </div>
  );
};

export default page;
