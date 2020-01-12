const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = process.env.SENDGRID_API_KEY;
const fromMail = process.env.APP_EMAIL;

sgMail.setApiKey(sendGridAPIKey);

const resetPasswordMail = (email, token) => {
    console.log(`http://localhost:3000/new-password/${token}`);
    sgMail.send({
        to: email,
        from: fromMail,
        subject: `Shop App - Reset Password Email`,
        html: `Hello,
        <p>Click on below link to reset your password:</p>
        <p><b>Link:</b> http://localhost:3000/new-password/${token}<p>`
    });
};

module.exports = {
    resetPasswordMail
};
