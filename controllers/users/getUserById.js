import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";

const getUserById = async (req, res, next) => {
  try {
    const requestedData = matchedData(req);
    const { userId } = requestedData;
    const user = await UserModel.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getUserById;
