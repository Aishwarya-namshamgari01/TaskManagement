import { Schema, model } from "mongoose";

const LabelSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});

const LabelModel = model("labels", LabelSchema);
export default LabelModel;
