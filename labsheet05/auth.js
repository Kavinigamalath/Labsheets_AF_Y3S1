// // auth.js
// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// // Dummy users (for demo)
// const users = [
//   { username: "admin", password: "pass" }, 
//   { username: "alice", password: "1234" }
// ];

// // Login route handler
// function login(req, res) {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (!user) return res.status(401).json({ error: "Invalid credentials" });
//   const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// }

// // JWT authentication middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ error: "Token required" });
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });
//     req.user = user;
//     next();
//   });
// }

// module.exports = { login, authenticateToken };
