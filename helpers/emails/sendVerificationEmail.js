// import nodemailer from "nodemailer";
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: { user: "example@gmail.com", pass: "example" },
// });
import transporter from "../transporter.js";

const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:3000/verify/${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email verification",
    text: `Click the following link to verify your email: ${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("error while sending email", err);
    else console.log("verification email sent", info);
  });
};

export default sendVerificationEmail;
