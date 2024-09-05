const express = require('express');
const dotenv = require('dotenv').config();
const transactionRoutes = require('./routes/transactionRoutes');
const {errorHandler} = require('./middleware/errorMiddleware');

const app = express();

//Middleware to parse JSON request body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//API routes
app.use('/api', transactionRoutes);

//Error Handling middleware
app.use(errorHandler); //Custom error handler

module.exports = app;

