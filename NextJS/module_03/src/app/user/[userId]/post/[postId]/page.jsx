import React from "react";

const page = async ({ params }) => {
  const { postId, userId } = await params;
  return (
    <div>
      UserId: {userId}
      <br />
      PostId: {postId}
    </div>
  );
};

export default page;
