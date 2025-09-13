// token.util.ts
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  username: string;
  email: string;
  name: string;
}

export const UGenerateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const token = jwt.sign(payload, secret, { 
    expiresIn: '24h' 
  });
  return token;
};