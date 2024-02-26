import jwt from "jsonwebtoken";
import UserModel from "../../models/UserModel.js";
const verifyEmailToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    jwt.verify(
      token,
      process.env.REGISTRATION_SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          res.status(401).json({ msg: "Unauthorized" });
        }
        console.log({ decoded });
        if (decoded) {
          const user = await UserModel.findOne({ _id: decoded.userId });
          if (!user || user.isVerified)
            return res.status(404).json({
              error: "Invalid verification token or user already verified",
            });
          user.isVerified = true;
          await user.save();
          res.json({ msg: "Email verified successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
export default verifyEmailToken;
