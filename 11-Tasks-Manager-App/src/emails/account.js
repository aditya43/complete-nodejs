const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = process.env.SENDGRID_API_KEY;
const fromMail = process.env.APP_EMAIL;

sgMail.setApiKey(sendGridAPIKey);

const welcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: fromMail,
        subject: `Welcome to Task Manager App`,
        text: `Hello ${name},
        Welcome to Task Manager App.`
    });
};

const accountCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: fromMail,
        subject: `Account Terminated`,
        text: `Hello ${name},
        Your account on Task Manager App has been terminated.`
    })
}

module.exports = {
    welcomeEmail,
    accountCancellationEmail
};