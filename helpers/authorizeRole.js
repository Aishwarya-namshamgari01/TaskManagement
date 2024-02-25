import { matchedData } from "express-validator";

const authorizeRole = ({ allowedRoles, errorMessage, verifyOwnUser }) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (allowedRoles?.includes(role)) {
      if (role === "USER" && verifyOwnUser) {
        const user = req.user._id;
        const requestedData = matchedData(req);
        const { userId } = requestedData;
        if (user.toString() !== userId) {
          return res
            .status(401)
            .json({ msg: errorMessage ?? "Unauthorized user" });
        }
      }
      next();
    } else {
      res.status(401).json({ msg: errorMessage ?? "Unauthorized user" });
    }
  };
};
export default authorizeRole;
