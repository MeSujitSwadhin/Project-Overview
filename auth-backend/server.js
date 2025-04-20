import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import admin from "./routes/adminRoute.js";
import errorMiddleware from "./middlewares/error.js";
import cors from 'cors';

// Load env first
dotenv.config();

const app = express();

// Middleware Setup
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", admin);

// Error Middleware
app.use(errorMiddleware);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Database Connection and Start Server
mongoose.connect(process.env.DB_URI, {
    dbName: "onepaydb",
}).then(() => {
    console.log('Database connected successfully.');

    const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is working on http://localhost:${process.env.PORT}`);
    });

    // Handling Unhandled Promise Rejection
    process.on("unhandledRejection", err => {
        console.log(`Error: ${err.message}`);
        console.log(`Shutting down the server due to Unhandled Promise Rejection`);

        server.close(() => {
            process.exit(1);
        });
    });
}).catch((err) => {
    console.log(`Failed to connect to database: ${err.message}`);
    process.exit(1);
});
