import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return <div>Currently, you are on {slug}</div>;
};

export default page;
