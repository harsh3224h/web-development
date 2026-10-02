"use server";

import { Tasks } from "@/lib/model";
import { connectDB } from "@/lib/db";

export async function retrieveTasks() {
    await connectDB();
    const tasks = await Tasks.find({});
    return JSON.parse(JSON.stringify(tasks));
}

export async function createTask(formData) {
    await connectDB();

    const title = formData.get("title");
    const content = formData.get("content");

    if (!title || !content) {
        return;
    }

    await Tasks.insertOne({ title, content });

    return {
        message: "Task Created",
        data: { title, content }
    }
}

export async function updateTask(id, task) {
    await connectDB();
    const { title, content } = task;
    await Tasks.findByIdAndUpdate(id, { title, content }, { new: true });
}

export async function removeTask(id) {
    await connectDB();
    await Tasks.findByIdAndDelete(id)
}