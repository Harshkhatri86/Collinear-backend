import { RegisterController } from '../controller/RegisterController';
import { Request, Response } from 'express';
import db from '../../models'; // Import your db module here
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock bcrypt.hash function
jest.mock('bcrypt', () => ({
  hash: jest.fn()
}));

// Mock jwt.sign function
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

describe('RegisterController', () => {
  it('should return an internal server error if an error occurs during password hashing', async () => {
    // Declare mockCreate variable
    const mockCreate = jest.fn();

    // Mock db.User.create function
    jest.spyOn(db.User, 'create').mockImplementation(mockCreate);

    // Mock request and response objects
    const mockReq = {
      body: {
        email: 'test@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890'
      }
    } as Request;

    const mockRes = {
      status: jest.fn(),
      json: jest.fn()
    } as unknown as Response;

    // Mock bcrypt.hash to throw an error
    const error = new Error('bcrypt error');
    (bcrypt.hash as jest.Mock).mockRejectedValue(error);

    // Call the RegisterController function
    await RegisterController(mockReq, mockRes);

    // Assert the response status and JSON
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal server error', error: error.message });
  });
});
