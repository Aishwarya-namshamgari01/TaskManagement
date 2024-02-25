import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";

const updateUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const role = req.user.role;
  const requestedData = matchedData(req);
  try {
    const updatedResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: requestedData.name,
          email: requestedData.email,
          role: requestedData.role,
          bio: requestedData.bio,
          profilePicture: req?.file?.path,
        },
      }
    );
    res.status(200).json(updatedResult);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default updateUserById;
