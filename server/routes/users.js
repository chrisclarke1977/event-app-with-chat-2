import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../db/schema.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const stmt = db.prepare(`
    SELECT users.*, GROUP_CONCAT(roles.name) as roles
    FROM users
    LEFT JOIN user_roles ON users.id = user_roles.user_id
    LEFT JOIN roles ON user_roles.role_id = roles.id
    GROUP BY users.id
  `);
  const users = stmt.all();
  res.json(users);
});

router.post('/', authenticateToken, (req, res) => {
  const { username, password, roles } = req.body;
  
  const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
  const result = stmt.run(username, password);
  
  if (roles && Array.isArray(roles)) {
    const roleStmt = db.prepare('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)');
    roles.forEach(roleId => {
      roleStmt.run(result.lastInsertRowid, roleId);
    });
  }
  
  res.status(201).json({ id: result.lastInsertRowid });
});

export const usersRouter = router;