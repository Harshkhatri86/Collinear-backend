import express from "express";
import "../../models/user"
import db from "../../models/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Create a Register User Controller

export const RegisterController = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create user in the database
        await db.User.create({ email, password: hashedPassword, firstName, lastName, phone });

        // Generate JWT token
        const token = jwt.sign({ email, password: hashedPassword }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });

        res.status(201).json({ message: "User created successfully", Token: token });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err });
    }
  };
