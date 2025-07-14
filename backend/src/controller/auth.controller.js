import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import { genarateVerificationToken } from "../utils/genarateVerificationToken.js";
import { genarateTokenandSetCookie } from "../utils/genarateTokenandSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPasswordResetEmailSuccess } from "../mail/email.js";


dotenv.config();
//controller for user signup
export const signupController = async (req, res) => {
  //get user data from request body
  const { username, email, password } = req.body;
  try {
    //check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      //==================|| check if email is already exit ||==================//
      //check if user already exists
      const userAlreadyExists = await User.findOne({ email });

      //if user already exists, return error
      if (userAlreadyExists) {
        return res
          .status(400)
          .json({ status: "success", message: "Email already exists" });
      } else {
        //==================|| create new user ||==================//

        //hashpassword
        const hashpassword = await bcryptjs.hash(password, 10);
        //generate verification token
        const verificationToken = await genarateVerificationToken();
        //create new user
        const newUser = new User({
          username,
          email,
          password: hashpassword,
          verificationToken,
          verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // Token valid for 24 hours
        });
        //save user to database
        const user = await newUser.save();
        //genarate token and cookie
        genarateTokenandSetCookie(res, user._id);
        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);

        //return success response
        return res.status(201).json({
          status: "success",
          message: "User created successfully",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            verificationExpires: user.verificationExpires,
            verificationToken: user.verificationToken,
            createdAt: user.createdAt,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    // Handle any unexpected errors
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

//controller for user verification
export const verificationEmail = async (req, res) => {
  const { verficationToken } = req.body;
  console.log(verficationToken);
  try {
    //find the user with the provided verification token
    const user = await User.findOne({
      verificationToken: verficationToken,
      verificationExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    //if user not found or token is expiresd
    if (!user) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Invalid or expired verification token",
        });
    } else {
      user.isVerified = true;
      user.verificationToken = null; // Clear the verification token
      user.verificationExpires = null; // Clear the verification expiration date
      await user.save(); // Save the updated user document

      //send welcome email
      await sendWelcomeEmail(user.email, user.username);

      // Respond with success
      return res
        .status(200)
        .json({ status: "success", message: "Email verified successfully" });
    }
  } catch (error) {
    // Handle any errors that occur during the verification process
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
    console.error(error);
  }
};

//controller for user login
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //check if user has not
    if (!user) {
      return res.status(400).json({ status: "error", message: "User not found with this email" });
    } else if (!user.isVerified) {
      return res.status(400).json({ status: "error", message: "User is not verified" });
    } else {

      //compare password
      const isValidPassword = await bcryptjs.compare(password, user.password);
      //if password is not valid
      if (!isValidPassword) {
        return res.status(400).json({ status: "error", message: "Invalid password" });
      } else {
        await genarateTokenandSetCookie(res, user._id);
        user.lastLogin = Date.now();
        await user.save(); // Save the last login time
        //return success response
        return res.status(200).json({
          status: "success", message: "Logged in successfully", user: {
            id: user._id,
            username: user.username,
            email: user.email,
          }
        })

      }

    }

    //check if

  } catch (error) {
    console.error(error);
    // Handle any unexpected errors
    return res.status(500).json({ status: "error", message: "Internal Server Error" });

  }
};

//controller for user logout
export const logoutController = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ status: "success", message: "Logged out successfully" });
};

//controller for forgot password
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    //find user by email
    const user = await User.findOne({
      email
    })
    //if user not found
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found with this email" });
    }


    const passwordResetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetExpires = Date.now() + 60 * 60 * 1000; // Token valid for 60 minutes

    // resetPasswordToken:String,
    //resetPasswordExpires:Date,
    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpires = passwordResetExpires;

    await user.save();

    //send password reset email
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password?token=${passwordResetToken}`);
    return res.status(200).json({ status: "success", message: "Password reset email sent successfully" });

  } catch (error) {

    res.status(500).json({ status: "error", message: "Internal Server Error" });
    console.error(error);
  }

}


//controller for reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {

    //find the user with the provided reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
    })

    //if user not found or token is expired
    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid or expired reset token" });
    } else {
      //hash the new password
      const hashedPassword = await bcryptjs.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null; // Clear the reset token
      user.resetPasswordExpires = null; // Clear the reset expiration date
      await user.save(); // Save the updated user document

      await sendRestPasswordEmailsuccess(user.email, user.username);
      res.status(200).json({ status: "success", message: "Password reset successfully" });
    }

  } catch (error) {

  }

}


export const checkAuth = async (req, res) => {
  try {
    // Debug: log userId to verify it's set
    console.log('checkAuth req.userId:', req.userId);
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    return res.status(200).json({ status: "success", user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });

  }
}