import express from 'express';
import mongoose from 'mongoose';
import router from './src/route/api.js';
import rateLimit from 'express-rate-limit';
import * as path from "path";
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended: "50mb"}));
const limiter = rateLimit({ windowMs: 15*60*1000, max: 3000 });
app.use(limiter);


// Web cache validation and conditional requests in Http
app.set('etag', false);


// MongoDB connection
const URI = 'mongodb://localhost:27017/TopicManager'; 
let OPTION={user:'',pass:'',autoIndex:true}

mongoose.connect(URI, OPTION)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
});

// API routes
app.use('/api/', router);

// Serve static assets for React front end
app.use(express.static('client/dist'));


// Serve React front end for all routes not handled by the API
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client' , 'dist', 'index.html'));
});

export default app;
