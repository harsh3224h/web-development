import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    }
})

export const Tasks = mongoose.models.Tasks || mongoose.model("Tasks", TasksSchema);