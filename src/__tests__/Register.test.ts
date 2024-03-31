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
  it('should create a new user and return a JWT token', async () => {
    // Declare mockCreate variable
    const mockCreate = jest.fn();

    // Mock db.User.create function to indicate successful user creation
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

    // Mock Response object
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn()
    } as unknown as Response;

    // Mock bcrypt.hash to return a hashed password
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    // Mock jwt.sign to return a token
    (jwt.sign as jest.Mock).mockReturnValue('token');

    // Call the RegisterController function
    await RegisterController(mockReq, mockRes);

    // Assert that bcrypt.hash was called with the correct arguments
    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);

    // Assert that db.User.create was called with the correct arguments
    expect(mockCreate).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashedPassword',
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890'
    });

    // Assert that jwt.sign was called with the correct arguments
    expect(jwt.sign).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashedPassword'
    }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });

    // Assert the response status and JSON
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'User created successfully', Token: 'token' });
  });
});
