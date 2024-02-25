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
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};
export default getAllUsers;
