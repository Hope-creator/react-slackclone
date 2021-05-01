import nodemailer from "nodemailer";

const emailService = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST || "smtp.mailtrap.io",
  port: Number(process.env.NODEMAILER_PORT) || 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

interface ISendEmailParams {
  email: string;
  baseUrl: string;
  userId: string;
  secretCode: string;
  callback: (err: Error | null) => void;
}

const sendEmail = ({
  email,
  baseUrl,
  userId,
  secretCode,
  callback
}: ISendEmailParams) => {
  const mailData = {
    from: `admin@slackclone.com`,
    to: email,
    subject: "Your Activation Link for Slackclone",
    text: `Please use the following link within the next 10 minutes to activate your account : ${baseUrl}/api/auth/verification/verify-account/${userId}/${secretCode}`,
    html: `<p>Please use the following link within the next 10 minutes to activate your account : <strong><a href="${baseUrl}/api/auth/verification/verify-account/${userId}/${secretCode}" target="_blank">Email bestätigen</a></strong></p>`,
  };

  return emailService.sendMail(mailData, callback);
};

export { emailService, sendEmail };
