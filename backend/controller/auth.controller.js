import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { genarateVerificationToken } from "../utils/genarateVerificationToken.js";
import { genarateTokenandSetCookie } from "../utils/genarateTokenandSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mail/email.js";
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

export const loginController = async (req, res) => {
  res.send("login");
};

export const logoutController = async (req, res) => {
  res.send("logout");
};
