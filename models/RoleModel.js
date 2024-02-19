import { Schema, model } from "mongoose";

const RoleSchema = Schema(
  {
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const RoleModel = model(RoleSchema);

export default RoleModel;
