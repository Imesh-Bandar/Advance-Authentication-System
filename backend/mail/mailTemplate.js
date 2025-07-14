//=========================|| Design email templates ||=========================//

// Confirmation Email Template
export const confirmationTemplate = ({ username, confirmationLink }) => {
    return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Email Confirmation</h2>
      <p>Hello ${username},</p>
      <p>Thank you for registering. Please confirm your email address by clicking the link below:</p>
      <a href="${confirmationLink}" style="color: #4CAF50;">Confirm Email</a>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
}

// Verification Email Template
export const verificationTemplate = ({ username, verificationCode }) => {
    return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Verification Code</h2>
      <p>Hello ${username},</p>
      <p>Your verification code is:</p>
      <h3 style="color: #4CAF50;">${verificationCode}</h3>
      <p>Enter this code to proceed. If you did not request this, please ignore this email.</p>
    </div>
  `;
}

// Welcome Email Template
export const welcomeTemplate = ({ username }) => {
    return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Welcome to Our Service!</h2>
      <p>Hello ${username},</p>
      <p>We're excited to have you on board. Explore our features and let us know if you have any questions.</p>
      <p>Best regards,<br/>The Team</p>
    </div>
  `;
}

// Only export once at the end
export const mailTemplates = {
    confirmationTemplate,
    verificationTemplate,
    welcomeTemplate
};