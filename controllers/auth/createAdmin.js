import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";
import { hashSync } from "bcrypt";

const createAdmin = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const userExists = await UserModel.findOne({ email: requestedData?.email });
    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }
    const hashedPassword = hashSync(requestedData.password, 12);
    const user = UserModel({
      name: requestedData.name,
      email: requestedData.email,
      password: hashedPassword,
      bio: requestedData.bio,
      profilePicture: req?.file?.path,
      role: "ADMIN",
    });
    const result = await user.save();
    res.status(200).json({ msg: "ADMIN user created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default createAdmin;
