import jwt from "jsonwebtoken";
import UserModel from "../../models/UserModel.js";
import sendResetEmail from "./sendResetEmail.js";

const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.REGISTRATION_SECRET_KEY,
      { expiresIn: "1h" }
    );
    sendResetEmail(email, token);
    res.json({ message: "Password reset email sent successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default forgotPassword;
