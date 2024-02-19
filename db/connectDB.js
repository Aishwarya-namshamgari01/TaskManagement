import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "TaskManagement" })
    .then((res) => console.log("connceted"))
    .catch((err) => console.log({ err }));
};

export default connectDB;
