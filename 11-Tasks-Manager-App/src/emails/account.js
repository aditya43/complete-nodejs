const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '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';
const fromMail = 'aditya.hajare@jetsynthesys.com';

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