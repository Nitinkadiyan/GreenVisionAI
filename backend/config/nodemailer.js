require("dotenv").config();

const nodemailer = require("nodemailer");

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASSWORD LOADED:", !!process.env.EMAIL_PASS);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are missing in .env");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = transporter;
