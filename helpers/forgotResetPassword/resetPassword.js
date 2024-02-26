import jwt from "jsonwebtoken";
import UserModel from "../../models/UserModel.js";
import { hashSync } from "bcrypt";
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { newPassword } = req.body;
    console.log({ token }, { newPassword });
    jwt.verify(
      token,
      process.env.REGISTRATION_SECRET_KEY,
      async (err, decoded) => {
        if (err) res.status(401).json({ msg: "Unauthorized" });
        if (decoded) {
          const user = await UserModel.findOne({ _id: decoded.userId });
          if (!user) res.status(401).json({ msg: "User not found" });
          const newHashedPassword = hashSync(newPassword, 12);
          user.password = newHashedPassword;
          const result = await user.save();
          res.status(200).json({ msg: "Password got reset successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
export default resetPassword;
