const express = require('express');
const connectDB = require('./config/db')

const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

// Define Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));