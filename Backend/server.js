require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000; // Use a higher-numbered port like 8081

app.use(cors());
app.use(bodyparser.json());0

const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB connection successful!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
    });

// Import and use routes
const studentRoutes = require('./routes/students.js');
app.use('/students', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is in use. Try a different port.`);
    } else if (err.code === 'EACCES') {
        console.error(`Permission denied. Try running with elevated privileges or using a different port.`);
    } else {
        console.error('Server error:', err);
    }
});
