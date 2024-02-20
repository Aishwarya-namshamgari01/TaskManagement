import { Schema } from "mongoose";

const SubTasksSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      enum: ["pending", "inProgress", "completed"],
    },
  },
  { timestamps: true }
);

export default SubTasksSchema;
