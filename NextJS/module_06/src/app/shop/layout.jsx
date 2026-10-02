import React from "react";
import Sidebar from "@/components/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
