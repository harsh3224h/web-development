import React from "react";

const page = async ({ params }) => {
  const { userId } = await params;
  return <div>{userId}</div>;
};

export default page;
