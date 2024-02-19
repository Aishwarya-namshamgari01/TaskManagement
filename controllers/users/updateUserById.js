import UserModel from "../../models/UserModel.js";

const updateUserById = async (req, res, next) => {
  const userId = req.params.userId;
  const role = req.user.role;
  try {
    if (role === "ADMIN" || req.user._id === userId) {
      const updatedResult = await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            bio: req.body.bio,
            profilePicture: req.body.image,
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
