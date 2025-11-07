// backend/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';

// In-memory storage (replace with database in production)
let users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Admin User',
    role: 'admin'
  }
];
let tasks = [];
let meetings = [];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { 
      id: Date.now(), 
      email, 
      password: hashedPassword, 
      name, 
      role: role || 'student' 
    };
    
    users.push(user);
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
app.get('/api/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role 
    } 
  });
});

// Tasks API
app.get('/api/tasks', authenticateToken, (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create tasks' });
  }
  
  const task = { 
    id: Date.now(), 
    ...req.body, 
    createdBy: req.user.id,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  res.json(task);
});

// Meetings API
app.get('/api/meetings', authenticateToken, (req, res) => {
  res.json(meetings);
});

app.post('/api/meetings', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create meetings' });
  }
  
  const meeting = { 
    id: Date.now(), 
    ...req.body, 
    createdBy: req.user.id,
    createdAt: new Date().toISOString()
  };
  meetings.push(meeting);
  res.json(meeting);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Default admin: admin@example.com / password`);
});