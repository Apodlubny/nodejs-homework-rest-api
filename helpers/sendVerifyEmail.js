const sgMail = require("@sendgrid/mail");
const { requestError } = require("./requestError");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerifyEmail = async (data) => {
  try {
    const mail = { ...data, from: "apodlubny@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw requestError(error.status, error.message);
  }
};

module.exports = sendVerifyEmail;
