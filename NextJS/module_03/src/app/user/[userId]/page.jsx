import React from "react";

const page = async ({ params }) => {
  const { userId } = await params;
  return <div>Hey user {userId}</div>;
};

export default page;
