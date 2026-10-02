import mongoose, { mongo } from "mongoose";

export async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
}