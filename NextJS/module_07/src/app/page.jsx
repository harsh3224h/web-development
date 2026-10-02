"use client"

import { createTask, removeTask, updateTask, retrieveTasks } from "@/actions/task";
import { useEffect, useState } from "react";

export default function Home() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(true);
  const [updateTaskId, setUpdateTaskId] = useState(null);

  async function fetchData() {
    setIsLoading(true);
    const tasks = await retrieveTasks();
    if (tasks) {
      setIsLoading(false);
      setData(tasks);
    }
  }

  async function handleTaskUpdate() {
    await updateTask(updateTaskId, { title, content });
    setTitle("");
    setContent("");
    setUpdateMode(false);
    setUpdateTaskId(null);
  }
  async function handleTaskDelete(id) {
    await removeTask(id);
  }

  useEffect(() => { }, [fetchData])

  return (
    <div>
      <form action={createTask}>
        <div className="flex flex-col gap-4 p-10">
          <h2 className="font-bold text-2xl">Form</h2>
          <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" className="border-1 border-gray-600 p-2 rounded-lg w-90" />
          <input name="content" type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter Content" className="border-1 border-gray-600 p-2 rounded-lg w-90" />
          <div className="flex gap-5">
            {!updateMode && <button type="submit" className="px-1 flex  items-center justify-center py-2 rounded-lg bg-gray-800 border border-gray-600 w-20">Submit</button>
            }
            {updateMode && <button onClick={() => handleTaskUpdate()} className="px-1 flex  items-center justify-center py-2 rounded-lg bg-gray-800 border border-gray-600 w-20">Update</button>
            }

            <button onClick={() => fetchData()} disabled={isLoading} type="submit" className="px-1 flex  items-center justify-center py-2 rounded-lg bg-gray-800 border border-gray-600 w-20">Fetch</button>
          </div>

          <h2 className="mt-10 font-bold text-2xl">All Tasks</h2>
          <div className="grid gap-2 grid-cols-2">
            {isLoading && <p>Loading all tasks ...</p>}
            {data.map((task) => (
              <div key={task._id} className="flex flex-col gap-3 p-5 bg-gray-800 border-1 border-gray-600 w-70">
                <h2 className="font-bold text-xl">{task.title}</h2>
                <p>{task.content}</p>

                <div className="flex gap-2">
                  <button className="bg-grap-700 cursor-pointer p-2 rounded-lg border-1 border-gray-600" onClick={() => {
                    setTitle(task.title);
                    setContent(task.content);
                    setUpdateMode(true);
                    setUpdateTaskId(task._id)
                  }}>✏️</button>
                  <button className="bg-grap-700 cursor-pointer p-2 rounded-lg border-1 border-gray-600" onClick={() => handleTaskDelete(task._id)}>❌</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
