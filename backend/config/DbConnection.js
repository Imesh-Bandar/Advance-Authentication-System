import mongoose from "mongoose";

import express from "express";

import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config(); 

export const DbConnection = async () => {
  try {
    //console.log("Connecting to the database...", process.env.MONGO_URI);
    const MOGOURL = process.env.MONGO_URI;
    const conn = await mongoose.connect(MOGOURL);
    if (conn) {
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
