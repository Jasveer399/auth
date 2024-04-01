import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("Connection established with MongoDB");
    });
    connection.on("error", (err) => {
      console.log("Connection Faild with MongoDB" + err);
      process.exit(1);
    });
  } catch (error: any) {
    throw new Error(`Error:connecting to MongoDb` + error.message);
  }
};
