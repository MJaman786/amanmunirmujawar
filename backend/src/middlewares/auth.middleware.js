import jwt from 'jsonwebtoken';
import AppError from "../common/AppError.js";
import envConfig from '../config/env.config.js';
import { Session } from '../modules/auth/auth.modal.js';

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, envConfig.JWT_SECRET);

        // Production Security Check: Ensure the exact session has not been revoked in real-time
        if (decoded.sessionId) {
            const activeSession = await Session.findById(decoded.sessionId);
            if (!activeSession || activeSession.revoked) {
                throw new AppError('Your active login session has expired or been revoked. Please log in again.', 401);
            }
        }

        req.user = decoded; // Contains parsed structure: { id, email, role, sessionId }
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Access token expired', 401));
        }
        next(error);
    }
}

export default protect;