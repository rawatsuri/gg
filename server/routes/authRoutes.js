import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const router = express.Router();

// Demo user credentials
const DEMO_USER = {
  email: 'demo@example.com',
  password: 'demo123',
  name: 'Demo User'
};

// Create demo user if it doesn't exist
async function createDemoUser() {
  try {
    const existingUser = await User.findOne({ email: DEMO_USER.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(DEMO_USER.password, 8);
      await User.create({
        ...DEMO_USER,
        password: hashedPassword
      });
      console.log('Demo user created successfully');
    }
  } catch (error) {
    console.error('Error creating demo user:', error);
  }
}

// Create demo user on server start
createDemoUser();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ 
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ 
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;