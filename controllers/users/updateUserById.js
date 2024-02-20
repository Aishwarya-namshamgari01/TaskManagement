import { matchedData } from "express-validator";
import UserModel from "../../models/UserModel.js";

const updateUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const role = req.user.role;
  const requestedData = matchedData(req);
  try {
    if (role === "ADMIN" || req.user._id === userId) {
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
    } else {
      res
        .status(401)
        .json({ msg: "only Admin user can edit the user details" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default updateUserById;
