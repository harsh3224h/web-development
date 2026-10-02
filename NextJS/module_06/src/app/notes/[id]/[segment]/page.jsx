"use client";

import React from "react";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  console.log("Params fetched successfully");
  console.log(params);
  return <div>page</div>;
};

export default page;
