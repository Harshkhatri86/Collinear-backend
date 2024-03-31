import express from 'express';
import RegisterRoutes from './Routes/RegisterRoutes';
const app = express();

// Showing the welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Express app! It\'s up and running.');
});
//Register Middleware
app.use('/User', RegisterRoutes);

export default app;