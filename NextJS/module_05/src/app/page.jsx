"use client";

import React from "react";

export default function Page() {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        status: false,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage(data.todo.title);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>My TODOs</h2>
          <label htmlFor="title">
            Title:{" "}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
            />
          </label>
          <button type="submit">Add</button>
        </form>

        {message && <p>ToDo created: {message}</p>}
      </div>
    </>
  );
}
