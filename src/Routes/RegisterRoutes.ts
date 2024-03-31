import express from 'express';
import { RegisterService } from '../services/RegisterSevices';
const router = express.Router();

// Register User Route
/**
 * @swagger
 * /User/Register:
 *   post:
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email address of the user.
 *             password:
 *               type: string
 *               description: The password of the user.
 *             firstName:
 *               type: string
 *               description: The first name of the user.
 *             lastName:
 *               type: string
 *               description: The last name of the user.
 *             phone:
 *               type: string
 *               description: The phone number of the user.
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 Token:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */

router.post('/Register', RegisterService.RegisterUser);

export default router;