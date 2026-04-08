const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    // Verify DB connectivity
    await req.app.locals.db.query('SELECT 1');
    res.json({ status: 'ok', timestamp: new Date() });
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'Database unreachable', timestamp: new Date() });
  }
});

module.exports = router;
