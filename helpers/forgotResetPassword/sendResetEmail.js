import transporter from "../transporter.js";

const sendResetEmail = (email, token) => {
  const resetLink = `http://localhost:3000/resetPassword/${token}`;
  const mailOptions = {
    from: "aishwaryaaishu167@gmail.com",
    to: email,
    subject: "Reset Password",
    text: `Please click the link reset your password--${resetLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("err while sending reset password link");
    else console.log("reset password link sent successfully");
  });
};
export default sendResetEmail;
