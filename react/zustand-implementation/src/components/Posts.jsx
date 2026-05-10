import React, { useEffect } from "react";
import { usePostStore } from "../store/postStore";

function Posts() {
  const { posts, loading, error, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>{error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default Posts;
