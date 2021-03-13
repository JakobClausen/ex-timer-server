import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_PORT,
} from "../config/config";

export const sendEmail = async (to: string, html: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: +EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "Gym Hub",
    to,
    subject,
    html,
  });

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
