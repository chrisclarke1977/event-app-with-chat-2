import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../db/schema.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const stmt = db.prepare('SELECT * FROM groups');
  const groups = stmt.all();
  res.json(groups);
});

router.post('/', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  
  const stmt = db.prepare('INSERT INTO groups (name, description) VALUES (?, ?)');
  const result = stmt.run(name, description);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

export const groupsRouter = router;