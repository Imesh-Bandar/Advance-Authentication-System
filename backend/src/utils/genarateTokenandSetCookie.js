import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();




// This function generates a JWT token and sets it as a cookie in the response
export const genarateTokenandSetCookie = (res, userid) => {
  // Use 'id' as the payload key to match verifyToken.js
  const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });

  // Set the token as a cookie in the response
  res.cookie("authToken", token, {
    httpOnly: true, // Cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === "production", // Cookie is only sent over HTTPS in production
    sameSite: "strict", // Cookie is sent only for same-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
  })
  return token; // Return the generated token
};
