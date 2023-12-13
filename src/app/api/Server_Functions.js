import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const saltRounds = 10;
const secretKey = process.env.JWT_KEY;

async function hashPassword(x) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(x.password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

async function comparePassword(passAttempt, hash){
    try {
        const result = await bcrypt.compare(passAttempt, hash);
        return result;
    } catch (error) {
        return error;
    } 
}


export function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; // Token is invalid
  }
}


module.exports = { hashPassword, comparePassword, generateToken, verifyToken };