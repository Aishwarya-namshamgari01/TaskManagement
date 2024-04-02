import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";
import { hashSync } from "bcrypt";
import sendVerificationEmail from "../../helpers/emails/sendVerificationEmail.js";
import jwt from "jsonwebtoken";

const registration = async (req, res, next) => {
  try {
    // const role = req.user.role;
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
    console.log({ result });

    // Registration Token:
    // Purpose: Used for email verification during the registration process.
    // Claims: May include information like the user's ID (userId) and a special claim indicating that it's meant for email verification (verifyEmail).
    const token = jwt.sign(
      {
        userId: result?._id,
        verifyEmail: true,
      },
      process.env.REGISTRATION_SECRET_KEY,
      { expiresIn: 24000 }
    );

    sendVerificationEmail(requestedData.email, token);
    res.status(200).json({ msg: "Successfully Registered" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
export default registration;
