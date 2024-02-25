import UserModel from "../../models/UserModel.js";

const deleteUserById = async (req, res, next) => {
  try {
    const role = req.user.role;
    const userId = req.params.userId;
    const result = await UserModel.deleteOne({ _id: userId });
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    (err) => res.status(500).json(err);
  }
};
export default deleteUserById;
