import UserModel from "../../models/UserModel.js";

const getAllUsers = (req, res, next) => {
  try {
    const role = req.user.role;
    if (role === "ADMIN") {
      UserModel.find()
        .then((users) => {
          res.status(200).json({ users });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res
        .status(401)
        .json({ msg: "Please login as admin to view users list " });
    }
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};
export default getAllUsers;
