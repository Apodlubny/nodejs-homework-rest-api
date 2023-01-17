const createVerifyMail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify email please</a> `,
  };
};

module.exports = createVerifyMail;
