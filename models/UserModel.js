import mongoose, { Schema } from "mongoose";

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
