import mongoose, { Schema } from "mongoose";

const TaskHistorySchema = Schema(
  {
    changes: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default TaskHistorySchema;
