const { createClerkClient } = require('@clerk/backend');

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * requireAuth — verifies the Clerk JWT from the Authorization header.
 * On success, attaches `req.auth` with `{ userId, sessionId }`.
 * On failure, responds 401.
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  const token = authHeader.slice(7);

  try {
    const { sub: userId, sid: sessionId } = await clerk.verifyToken(token);
    req.auth = { userId, sessionId };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };
