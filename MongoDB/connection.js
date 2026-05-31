import mongoose from "mongoose";

export const connectDB = async (connectionURL) => {
  const connection = await mongoose.connect(connectionURL);
  return connection;
};
