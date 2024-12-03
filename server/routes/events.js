import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../db/schema.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const stmt = db.prepare(`
    SELECT events.*, users.username as creator_name
    FROM events
    LEFT JOIN users ON events.created_by = users.id
  `);
  const events = stmt.all();
  res.json(events);
});

router.post('/', authenticateToken, (req, res) => {
  const { title, description, detailed_description, location, event_time, event_picture } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO events (title, description, detailed_description, location, event_time, event_picture, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    title,
    description,
    detailed_description,
    location,
    event_time,
    event_picture,
    req.user.id
  );
  
  res.status(201).json({ id: result.lastInsertRowid });
});

export const eventsRouter = router;