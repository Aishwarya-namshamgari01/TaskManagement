import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const email = requestedData.email;
    const password = requestedData.password;
    const user = await UserModel.findOne({ email: email });
    // if (!user) {
    //   res.status(400).json({ msg: "User doesnot exists with email" });
    //   return;
    // }
    if (!user || !user.isVerified) {
      return res
        .status(401)
        .json({ error: "Invalid login credentials or email not verified" });
    }
    const validPassword = compareSync(password, user.password);
    if (!validPassword) {
      res.status(401).json({ msg: "Invalid password", accessToken: null });
      return;
    }
    const token = jwt.sign(
      {
        name: user.name,
        password: user.password,
        role: user.role,
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 24000,
      }
    );
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      msg: "Logged in successfully",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
export default login;
