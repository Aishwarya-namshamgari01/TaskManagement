import { Schema, model } from "mongoose";

const NotificationSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel = model("notifications", NotificationSchema);
export default NotificationModel;
