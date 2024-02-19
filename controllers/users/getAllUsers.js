import UserModel from "../../models/UserModel.js";

const getAllUsers = (req, res, next) => {
  try {
    // Pagination
    let skip = 0;
    let limit = null;
    if (req?.query?.page && req?.query?.limit) {
      skip = (req?.query?.page - 1) * req?.query?.limit;
      limit = req?.query?.limit;
    }

    const role = req.user.role;
    if (role === "ADMIN") {
      UserModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 })
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
