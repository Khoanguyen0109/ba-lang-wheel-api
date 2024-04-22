import { verify } from 'jsonwebtoken';

export const authMiddleWare = async (req, res, next) => {
  // Lấy access token từ header
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Invalid authorization header' });
  }
  const token = authorizationHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token not found' });
  }
  try {
    const decoded = verify(token, (process.env as any).JWT_SECRET_KEY);
    (req as any).user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  return next();
};
