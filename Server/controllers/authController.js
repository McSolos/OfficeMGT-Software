const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.register = async (req, res) => {
    const { username, password, role } = req.body;
  
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'All fields required' });
    }
  
    try {
      const [exists] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
      if (exists.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 11);
      await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
        username,
        hashedPassword,
        role,
      ]);
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// bcrypt.hash('FuckOff', 11).then(hash => console.log(hash));

