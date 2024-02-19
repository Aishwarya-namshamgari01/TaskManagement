import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";
import { hashSync } from "bcrypt";

const registration = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "ADMIN") {
      const requestedData = matchedData(req);
      const userExists = await UserModel.findOne({
        email: requestedData.email,
      });
      if (userExists) {
        res
          .status(400)
          .json({ msg: "User Already exists, Please use different email" });
        return;
      }

      const hashedPassword = hashSync(requestedData?.password, 12);
      const user = UserModel({
        name: requestedData.name,
        email: requestedData.email,
        password: hashedPassword,
        role: requestedData?.role,
        bio: req.body.bio,
        profilePicture: req?.file?.path,
      });
      const result = await user.save();
      res.status(200).json({ msg: "Successfully Registered" });
    } else {
      res.status(400).json({ msg: "Only ADMIN can create users" });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
export default registration;
