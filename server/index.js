import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import connectDB from './config/database.js';
import initializeSocket from './config/socket.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import validateEnv from './config/validateEnv.js';
import { logger } from './utils/logger.js';

// Load and validate environment variables
dotenv.config();
validateEnv();

// Route imports - Only doctor panel specific routes
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import prescriptionRoutes from './routes/prescriptions.js';
import medicalHistoryRoutes from './routes/medicalHistory.js';
import patientRoutes from './routes/patients.js';
import chatRoutes from './routes/chat.js';

// Initialize express app
const app = express();
const httpServer = createServer(app);

// Connect to MongoDB with specific database
connectDB();

// Initialize Socket.IO for doctor-specific real-time features
const io = initializeSocket(httpServer);

// Security middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('dev'));
app.use(apiLimiter);

// Add io to request object for real-time features
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Doctor panel specific API routes
app.use('/api/doctor/auth', authRoutes);
app.use('/api/doctor/appointments', appointmentRoutes);
app.use('/api/doctor/prescriptions', prescriptionRoutes);
app.use('/api/doctor/medical-history', medicalHistoryRoutes);
app.use('/api/doctor/patients', patientRoutes);
app.use('/api/doctor/chat', chatRoutes);

// Health check endpoint for doctor panel
app.get('/api/doctor/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'doctor-panel',
    timestamp: new Date().toISOString()
  });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  logger.info(`Doctor Panel Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Error: ${err.message}`);
  httpServer.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Error: ${err.message}`);
  process.exit(1);
});