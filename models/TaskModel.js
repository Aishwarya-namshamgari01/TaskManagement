import { Schema, model } from "mongoose";

const TaskSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: false,
      enum: ["pending", "inProgress", "completed"],
    },
    priority: {
      type: String,
      required: false,
      enum: ["low", "medium", "high"],
    },
    attachments: {
      type: Array,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: false,
    },
    dependencies: [
      { type: Schema.Types.ObjectId, ref: "tasks", required: false },
    ],
  },
  { timestamps: true }
);

const TaskModel = model("tasks", TaskSchema);

export default TaskModel;
