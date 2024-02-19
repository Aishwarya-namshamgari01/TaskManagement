import { Schema, model } from "mongoose";

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const CategoryModel = model("categories", categorySchema);

export default CategoryModel;
