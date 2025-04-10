'use server'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@cryptosecurinc.com',
    pass: 'HelpmeGOD@!',
  },
});

export const sendInvitation = async (email: string, invitationLink: string) => {
  const mailOptions = {
    from: '"CrytpoSECUR INC." <info@cryptosecurinc.com>',
    to: email,
    subject: 'You are Invited!',
    text: `Please use the following link to accept your invitation: ${invitationLink}`,
    html: `<p>Please use the following link to accept your invitation: <a href="${invitationLink}">${invitationLink}</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendInvitation;
