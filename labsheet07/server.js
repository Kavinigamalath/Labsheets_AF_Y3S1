const express = require('express'); 
const mongoose = require('mongoose'); 
const userRoutes = require('./routes/users'); 
const app = express(); 
const port = 3000; 
// Middleware to parse JSON bodies 
app.use(express.json()); 
// MongoDB connection 
mongoose.connect('mongodb://localhost:27017/labDB', { 
useNewUrlParser: true, 
    useUnifiedTopology: true 
}) 
.then(() => console.log('MongoDB connected')) 
.catch(err => console.error('MongoDB connection error:', err)); 
 
// Routes 
app.use('/users', userRoutes); 
 
// Start the server 
app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}`); 
}); 