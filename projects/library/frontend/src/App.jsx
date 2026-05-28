import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Header className="" />
      <main className=" max-auto  h-[90%] mt-5 mb-10 w-[95%]">
        <Outlet className="h-full w-full" />
      </main>
    </div>
  );
}

export default App;
