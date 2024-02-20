import UserModel from "../../models/UserModel.js";

const deleteUserById = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "ADMIN") {
      const userId = req.params.userId;
      const result = await UserModel.deleteOne({ _id: userId });
      if (result) {
        res.status(200).json(result);
      }
    } else {
      res.status(401).json({ msg: "Admin user can only delete users" });
    }
  } catch (err) {
    (err) => res.status(500).json(err);
  }
};
export default deleteUserById;
