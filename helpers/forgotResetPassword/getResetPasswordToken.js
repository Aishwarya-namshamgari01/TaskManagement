const getResetPasswordToken = (req, res) => {
  try {
    const token = req.params.token;
    res.render("resetPasswordPage", { token });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default getResetPasswordToken;
