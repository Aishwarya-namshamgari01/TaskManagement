import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: { user: "aishwaryaaishu167@gmail.com", pass: "bvbexssxbfhkovyw" },
});
export default transporter;
