import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../db/schema.js';

const router = express.Router();

router.get('/:eventId', authenticateToken, (req, res) => {
  const stmt = db.prepare(`
    SELECT chat.*, users.username as sender_name
    FROM chat
    LEFT JOIN users ON chat.sender_id = users.id
    WHERE event_id = ?
    ORDER BY timestamp DESC
  `);
  const messages = stmt.all(req.params.eventId);
  res.json(messages);
});

router.post('/', authenticateToken, (req, res) => {
  const { event_id, message } = req.body;
  
  const stmt = db.prepare('INSERT INTO chat (event_id, sender_id, message) VALUES (?, ?, ?)');
  const result = stmt.run(event_id, req.user.id, message);
  
  res.status(201).json({ id: result.lastInsertRowid });
});

export const chatRouter = router;