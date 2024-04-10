import transporter from "../helpers/transporter.js";

const postInformation = (req, res) => {
  const { name, email, message } = req.body;
  console.log({ name }, { req });
  const mailOptions = {
    from: email,
    to: "aishwarya.namshamgari@yopmail.com",
    subject: "Contact information",
    text: `Hello Aishwarya, I'm ${name}, my email ${email}, my message ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("error while sending email", err);
    else res.status(200).json({message: 'email sent successfully'});
  });
};

export default postInformation;
