import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import connectDB from './utils/connectDB.js';
import initializeSocket from './config/socket.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Route imports
import healthRoutes from './routes/health.js';
import appointmentRoutes from './routes/appointments.js';
import prescriptionRoutes from './routes/prescriptions.js';
import medicalHistoryRoutes from './routes/medicalHistory.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const httpServer = createServer(app);

// Connect to MongoDB
connectDB();

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('dev'));
app.use(apiLimiter);

// Add io to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  httpServer.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});