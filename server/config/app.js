import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { apiLimiter } from '../middleware/rateLimiter.js';

export const configureApp = (app) => {
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
};