import jwt from 'jsonwebtoken';
import { User, Otp, Session } from './auth.modal.js';
import AppError from '../../common/AppError.js';
import envConfig from '../../config/env.config.js';
import { 
    generateAccessToken, 
    generateRefreshToken, 
    generateOtp, 
    hashItem 
} from '../../utils/generators.utils.js';
import { sendEmail } from '../../shared/mail.js';
import emailVerificationTemplate from '../../templates/auth/emailVerification.template.js';
import passwordResetTemplate from '../../templates/auth/passwordReset.template.js';
import twoFactorTemplate from '../../templates/auth/twoFactor.template.js';
import welcomeTemplate from '../../templates/user/welcome.template.js';
import passwordChangedTemplate from '../../templates/auth/passwordChanged.template.js';

// ✅ Added role processing to the register definition
const register = async ({ name, email, password, phone, role }) => {
    let user = await User.findOne({ email });

    if (user) {
        if (user.isEmailVerified) {
            throw new AppError('Email already registered', 409);
        }
        // Overwrite details cleanly if unverified to resolve state deadlocks
        user.name = name;
        user.password = password; 
        user.phone = phone || null;
        user.role = role; // Updates the role state during re-registration
        await user.save();
    } else {
        user = await User.create({ name, email, password, phone, role });
    }

    await Otp.deleteMany({ userId: user._id, type: 'EMAIL_VERIFICATION' });

    const { otp, otpExpiry } = generateOtp(10);
    const otpHash = hashItem(otp);

    await Otp.create({
        userId: user._id,
        type: 'EMAIL_VERIFICATION',
        otpHash,
        expiresAt: otpExpiry,
    });

    try {
        const html = emailVerificationTemplate({ name: user.name, otp, expiryMinutes: 10 });
        await sendEmail({ to: user.email, subject: 'Verify your email address', html });
    } catch (error) {
        console.error('Email registration drop handling error: ', error);
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
    };
};

const resendVerificationOtp = async (email) => {
    const user = await User.findOne({ email });
    if (!user) return; 

    if (user.isEmailVerified) {
        throw new AppError('This account email is already verified.', 400);
    }

    const splitCheckTime = await Otp.findOne({
        userId: user._id,
        type: 'EMAIL_VERIFICATION',
        createdAt: { $gt: new Date(Date.now() - 60 * 1000) }
    });

    if (splitCheckTime) {
        throw new AppError('Please wait 60 seconds before requesting a new code.', 429);
    }

    await Otp.deleteMany({ userId: user._id, type: 'EMAIL_VERIFICATION' });

    const { otp, otpExpiry } = generateOtp(10);
    await Otp.create({
        userId: user._id,
        type: 'EMAIL_VERIFICATION',
        otpHash: hashItem(otp),
        expiresAt: otpExpiry,
    });

    try {
        const html = emailVerificationTemplate({ name: user.name, otp, expiryMinutes: 10 });
        await sendEmail({ to: user.email, subject: 'Verify your email address', html });
    } catch (error) {
        console.error('Email carrier error: ', error);
    }
};

const verifyEmailOtp = async ({ email, otp }) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError('User not found', 404);

    if (user.isEmailVerified) {
        throw new AppError('Email is already verified', 400);
    }

    const hashedInputOtp = hashItem(otp);
    const otpDoc = await Otp.findOne({
        userId: user._id,
        type: 'EMAIL_VERIFICATION',
        used: false,
        expiresAt: { $gt: new Date() },
    }).select('+otpHash');

    if (!otpDoc) throw new AppError('Invalid or expired OTP code', 400);

    if (otpDoc.attempts >= 5) {
        throw new AppError('Too many failed verification attempts. Please request a new code.', 429);
    }

    if (otpDoc.otpHash !== hashedInputOtp) {
        otpDoc.attempts += 1;
        await otpDoc.save();
        throw new AppError('Invalid OTP code', 400);
    }

    otpDoc.used = true;
    await otpDoc.save();

    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();
    await user.save();

    try {
        const html = welcomeTemplate({ name: user.name });
        await sendEmail({ to: user.email, subject: 'Welcome onboard!', html });
    } catch (error) {
        console.error('Onboarding dispatcher error: ', error);
    }

    return { email: user.email, isEmailVerified: true };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new AppError('Invalid email or password', 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError('Invalid email or password', 401);

    if (!user.isEmailVerified) {
        throw new AppError('Your email address has not been verified yet. Please verify your email to log in.', 403);
    }

    if (user.status === 'BANNED') throw new AppError('Your account has been banned', 403);
    if (user.status === 'INACTIVE') throw new AppError('Your account is currently inactive', 403);

    await Otp.deleteMany({ userId: user._id, type: 'TWO_FACTOR_AUTH' });

    const { otp, otpExpiry } = generateOtp(5);
    await Otp.create({
        userId: user._id,
        type: 'TWO_FACTOR_AUTH',
        otpHash: hashItem(otp),
        expiresAt: otpExpiry,
    });

    try {
        const html = twoFactorTemplate({ name: user.name, otp });
        await sendEmail({ to: user.email, subject: 'Your 2-Step Verification Code', html });
    } catch (error) {
        console.error('2FA dispatch error: ', error);
    }

    return { requires2FA: true, email: user.email };
};

const verify2fa = async ({ email, otp, ip, userAgent }) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError('User not found', 404);

    if (user.status === 'BANNED') throw new AppError('Your account has been banned', 403);

    const hashedInputOtp = hashItem(otp);
    const otpDoc = await Otp.findOne({
        userId: user._id,
        type: 'TWO_FACTOR_AUTH',
        used: false,
        expiresAt: { $gt: new Date() },
    }).select('+otpHash');

    if (!otpDoc) throw new AppError('Invalid or expired 2FA code', 400);

    if (otpDoc.attempts >= 5) {
        throw new AppError('Too many failed validation attempts. Restart login process.', 429);
    }

    if (otpDoc.otpHash !== hashedInputOtp) {
        otpDoc.attempts += 1;
        await otpDoc.save();
        throw new AppError('Invalid 2FA code', 400);
    }

    otpDoc.used = true;
    await otpDoc.save();

    const session = await Session.create({
        userId: user._id,
        ip,
        userAgent,
        refreshTokenHash: 'SESSION_INITIALIZATION',
    });

    const tokenPayload = { id: user._id, email: user.email, role: user.role, sessionId: session._id };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    session.refreshTokenHash = hashItem(refreshToken);
    await session.save();

    user.lastLogin = new Date();
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            isEmailVerified: user.isEmailVerified,
            lastLogin: user.lastLogin,
        },
    };
};

const refreshAccessToken = async ({ refreshToken, ip, userAgent }) => {
    if (!refreshToken) throw new AppError('Refresh token payload missing', 401);

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, envConfig.JWT_REFRESH_SECRET);
    } catch {
        throw new AppError('Invalid or expired refresh token', 401);
    }

    const session = await Session.findById(decoded.sessionId);

    if (!session || session.revoked) {
        if (session) {
            await Session.updateMany({ userId: decoded.id }, { revoked: true, logoutAt: new Date() });
        }
        throw new AppError('Session expired or token reuse detected. Re-authentication required.', 401);
    }

    const incomingHash = hashItem(refreshToken);
    if (session.refreshTokenHash !== incomingHash) {
        session.revoked = true;
        session.logoutAt = new Date();
        await session.save();
        
        await Session.updateMany({ userId: decoded.id }, { revoked: true, logoutAt: new Date() });
        throw new AppError('Security Infraction: Token reuse detected. Revoking global state.', 401);
    }

    const tokenPayload = { id: decoded.id, email: decoded.email, role: decoded.role, sessionId: session._id };
    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    session.refreshTokenHash = hashItem(newRefreshToken);
    session.ip = ip;
    session.userAgent = userAgent;
    await session.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async (userId, sessionId) => {
    await Session.findOneAndUpdate({ _id: sessionId, userId }, { revoked: true, logoutAt: new Date() });
};

const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User entity not found', 404);
    return user;
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) return; 

    await Otp.updateMany({ userId: user._id, type: 'PASSWORD_RESET', used: false }, { used: true });

    const { otp, otpExpiry } = generateOtp(10);
    await Otp.create({
        userId: user._id,
        type: 'PASSWORD_RESET',
        otpHash: hashItem(otp),
        expiresAt: otpExpiry,
    });

    try {
        const html = passwordResetTemplate({ name: user.name, otp, expiryMinutes: 10 });
        await sendEmail({ to: user.email, subject: 'Reset your password', html });
    } catch (error) {
        console.error('Recovery link error: ', error);
    }
};

const resetPassword = async ({ email, otp, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError('User address matching requested parameter not found', 404);

    const hashedInputOtp = hashItem(otp);
    const otpDoc = await Otp.findOne({
        userId: user._id,
        type: 'PASSWORD_RESET',
        used: false,
        expiresAt: { $gt: new Date() },
    }).select('+otpHash');

    if (!otpDoc) throw new AppError('Invalid or expired recovery code', 400);

    if (otpDoc.attempts >= 5) {
        throw new AppError('Too many failed authorization attempts. Request new code.', 429);
    }

    if (otpDoc.otpHash !== hashedInputOtp) {
        otpDoc.attempts += 1;
        await otpDoc.save();
        throw new AppError('Invalid OTP code', 400);
    }

    otpDoc.used = true;
    await otpDoc.save();

    user.password = password;
    await user.save();

    await Session.updateMany({ userId: user._id, revoked: false }, { revoked: true, logoutAt: new Date() });

    try {
        const html = passwordChangedTemplate({ name: user.name });
        await sendEmail({ to: user.email, subject: 'Your account password has been updated', html });
    } catch (error) {
        console.error('Confirmation layout error: ', error);
    }

    return { email: user.email };
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
    const user = await User.findById(userId).select('+password');
    if (!user) throw new AppError('User not found', 404);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new AppError('Current password context validation mismatch', 400);

    user.password = newPassword;
    await user.save();

    await Session.updateMany({ userId, revoked: false }, { revoked: true, logoutAt: new Date() });
};

const authServices = {
    register,
    resendVerificationOtp,
    verifyEmailOtp,
    login,
    verify2fa,
    refreshAccessToken,
    logout,
    getMe,
    forgotPassword,
    resetPassword,
    changePassword,
};

export default authServices;