import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
const verifyToken = (req, res, next) => {
  try {
    const headers = req.headers;
    if (
      headers &&
      headers.authorization &&
      headers.authorization.split(" ")[1]
    ) {
      const token = headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({ msg: "Unauthorized user" });
          return;
        }
        if (decoded) {
          UserModel.findOne({ _id: decoded.id })
            .then((user) => {
              req.user = user;
              next();
            })
            .catch((err) => {
              res.status(401).json({ msg: "Unable to find user" });
            });
        }
      });
    } else {
      res.status(401).json({ msg: "Add proper headers" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
export default verifyToken;
