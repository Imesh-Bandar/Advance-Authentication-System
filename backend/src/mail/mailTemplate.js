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


//password reset template
export const passwordResetTemplate = ({ resetLink }) => {
  return `
  <div style="font-family: Arial, sans-serif;">
    <h2>Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <a href=${resetLink} style="color: #4CAF50;">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
  </div>
  `;
}

export const passwordResetConfirmationTemplate = ({ username }) => {
  return `
  <div style="font-family: Arial, sans-serif;">
    <h2>Password Reset Successful</h2>
    <p>Hello ${username},</p>
    <p>Your password has been successfully reset. You can now log in with your new password.</p>
    <p>If you did not request this change, please contact support immediately.</p>
  </div>
  `;
}

// Only export once at the end
export const mailTemplates = {
    confirmationTemplate,
    verificationTemplate,
    passwordResetTemplate,
    welcomeTemplate,
    passwordResetConfirmationTemplate
};