require('dotenv').config(); // Load .env variables

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads')); // To serve uploaded images

app.set('view engine', 'ejs');

app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;

// --- In-memory user and post storage ---
let users = [];
let posts = [];
let nextPostId = 1;

app.get('/posts-view', (req, res) => {
    let { page, pageSize } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 5;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedPosts = posts.slice(start, end);
    const totalPages = Math.ceil(posts.length / pageSize);
    res.render('posts', { 
        posts: paginatedPosts,
        page,
        pageSize,
        totalPages
    });
});

// --- Middleware: Authenticate JWT ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// --- Register ---
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });
});

// --- Login ---
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '365d' });
    res.json({ token });
});


// Protected: Create a post with optional image upload
app.post('/api/posts', authenticateToken, upload.single('image'), (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });

    let imageUrl = null;
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    }

    const post = { id: nextPostId++, user: req.user.username, content, imageUrl };
    posts.push(post);
    res.status(201).json(post);
});

// --- Protected: Update a post ---
app.put('/api/posts/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    if (post.user !== req.user.username) return res.status(403).json({ error: 'Not your post.' });

    if (req.body.content) post.content = req.body.content;
    res.json(post);
});

// --- Protected: Delete a post ---
app.delete('/api/posts/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Post not found.' });
    if (posts[idx].user !== req.user.username) return res.status(403).json({ error: 'Not your post.' });

    posts.splice(idx, 1);
    res.json({ message: 'Post deleted.' });
});

// --- Public: Get one post by ID ---
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    res.json(post);
});

// --- Public: Get all posts ---
// GET all posts with pagination: /api/posts?page=1&pageSize=5
// --- Public: Get all posts with pagination ---
//http://localhost:3000/api/posts?page=3&pageSize=2

app.get('/api/posts', (req, res) => {
    let { page, pageSize } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 5;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedPosts = posts.slice(start, end);
    res.json({
        page,
        pageSize,
        totalPosts: posts.length,
        totalPages: Math.ceil(posts.length / pageSize),
        posts: paginatedPosts
    });
});


// --- Welcome Route ---
app.get('/', (req, res) => {
    res.send('Welcome to Social Media API with Authentication!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
