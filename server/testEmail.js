const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mkar0mkae@gmail.com',
    pass: 'tvpl odbf urou inet'
  }
});

const mailOptions = {
  from: 'mkar0mkae@gmail.com',
  to: 'jitef20161@almaxen.com',
  subject: 'Email Verification',
  text: 'This is a test email for verification'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('Email sent successfully:', info.response);
});
