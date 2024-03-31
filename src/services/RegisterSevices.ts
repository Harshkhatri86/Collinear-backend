import express from "express";
import { RegisterController } from "../controller/RegisterController";

// Create a Register User Service

export const RegisterService={
    RegisterUser: async (req: express.Request, res: express.Response) => {
        try {
         await RegisterController(req,res);
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"});
        }
    }
}