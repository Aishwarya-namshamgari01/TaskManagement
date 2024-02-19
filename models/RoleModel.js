import { Schema, model } from "mongoose";

const RoleSchema = Schema({
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const RoleModel = model(RoleSchema);

export default RoleModel;
