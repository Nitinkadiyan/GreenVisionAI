const transporter = require("../config/nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("User Signed In SUccessfully");
    console.log(info);
  } catch (error) {
    message: err.message;
    console.log(error);
  }
};

module.exports = sendEmail;