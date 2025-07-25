import { MailTrapClient, sender } from "./mailtrap.config.js"
import { mailTemplates, welcomeTemplate, passwordResetTemplate, passwordResetConfirmationTemplate } from "./mailTemplate.js";

const { verificationTemplate } = mailTemplates;


//=========================|| Send Verification Email ||=========================//
export const sendVerificationEmail = async (email, token) => {
    const recipient = [{
        email: email,
    }]
    try {
        const response = await MailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: verificationTemplate({ username: email, verificationCode: token }),
            category: "Verification Email",
        })
        console.log("Verification email sent successfully:", response);
    } catch (error) {
        console.error("Error sending verification email:", error);

    }

}

//=========================|| Send Welcome Email ||=========================//
export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{
        email: email,
    }]
    try {
        const response = await MailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Advance Authentication System",
            html: welcomeTemplate({ username }), // <-- Add comma here
            category: "Welcome Email"
        })
        console.log("Welcome email sent successfully:", response);
    } catch (error) {
        console.error("Error sending welcome email:", error);


    }

}


//=========================|| Send Password Reset Email ||=========================//
export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{
        email: email,
    }]

    try {
        const response = await MailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Request",
            html: passwordResetTemplate({ resetLink: resetUrl }) // <-- Add comma here
        })


    } catch (error) {

    }
}


//=========================|| Send Password Reset Email Success ||=========================//
export const sendPasswordResetEmailSuccess = async (email, username) => {
    const recipient = [{
        email: email,
    }]
    try {
        const response = await MailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: passwordResetConfirmationTemplate({ username }),
            category: "Password Reset Success"
        })



    } catch (error) {
        console.error("Error sending password reset success email:", error);
    }
}