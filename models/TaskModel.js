import { Schema, model } from "mongoose";
import CommentSchema from "./CommentSchema.js";
import SubTasksSchema from "./SubTasksSchema.js";
import TaskHistorySchema from "./TaskHistorySchema.js";

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
    comments: [CommentSchema],
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
    // Used for establishing relationships between tasks, defining the order of task execution, and managing dependencies.
    dependencies: [
      { type: Schema.Types.ObjectId, ref: "tasks", required: false },
    ],

    // Used for organizing and managing related data within a document, such as subtasks, comments, or other nested structures
    subTasks: [SubTasksSchema],

    //	Keep a log of changes made to tasks.

    taskHistory: [TaskHistorySchema],
  },
  { timestamps: true }
);

const TaskModel = model("tasks", TaskSchema);

export default TaskModel;
