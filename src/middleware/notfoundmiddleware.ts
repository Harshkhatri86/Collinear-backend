import { Request, Response, NextFunction } from 'express';

// Middleware to handle 404 errors

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
// Exclude Swagger routes from the 404 error handler
const isSwaggerRoute = req.path.startsWith("/docs");

if (!isSwaggerRoute) {
  res.status(404).json({ message: "Route not found" });
}
    
    } catch (error) {

        res.status(500).json({ message: "Internal server error", error: error });        
    }

     // Call next() to pass the request to the next middleware or route handler
     next();
};