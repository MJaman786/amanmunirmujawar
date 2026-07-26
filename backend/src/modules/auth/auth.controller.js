import asyncHandler from '../../common/asyncHandler.js';
import { sendSuccess } from '../../common/response.js';
import authService from './auth.service.js';

const getRequestMetadata = (req) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown Platform Device';
    return { ip, userAgent };
};

// POST /auth/register
const register = asyncHandler(async (req, res) => {
    // Destructured and passed role parameter down into the service pipeline
    const { name, email, password, phone, role } = req.body;
    const user = await authService.register({ name, email, password, phone, role });
    sendSuccess(res, {
        statusCode: 201,
        message: 'Registration successful. A 6-digit verification code has been sent to your email.',
        data: user,
    });
});

// POST /auth/resend-verification
const resendVerification = asyncHandler(async (req, res) => {
    await authService.resendVerificationOtp(req.body.email);
    sendSuccess(res, {
        message: 'If an unverified account matches that address, a new verification code has been dispatched.',
        data: null,
    });
});

// POST /auth/verify-email
const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const result = await authService.verifyEmailOtp({ email, otp });
    sendSuccess(res, { message: 'Email verified successfully.', data: result });
});

// POST /auth/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    sendSuccess(res, {
        message: 'Credentials valid. Two-Factor Authentication verification token distributed to email.',
        data: {
            requires2FA: result.requires2FA,
            email: result.email,
        },
    });
});

// POST /auth/verify-2fa
const verify2fa = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const { ip, userAgent } = getRequestMetadata(req);

    const result = await authService.verify2fa({ email, otp, ip, userAgent });

    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    sendSuccess(res, {
        message: '2-Step Verification complete. Login authorized.',
        data: {
            accessToken: result.accessToken,
            user: result.user,
        },
    });
});

// POST /auth/refresh
const refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const { ip, userAgent } = getRequestMetadata(req);

    const result = await authService.refreshAccessToken({ refreshToken, ip, userAgent });

    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
        message: 'Session token rotated successfully.',
        data: { accessToken: result.accessToken },
    });
});

// POST /auth/logout
const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id, req.user.sessionId);
    res.clearCookie('refreshToken');
    sendSuccess(res, { message: 'Logged out successfully.', data: null });
});

// GET /auth/me
const getMe = asyncHandler(async (req, res) => {
    const user = await authService.getMe(req.user.id);
    sendSuccess(res, { message: 'Identity context fetched successfully.', data: user });
});

// POST /auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body.email);
    sendSuccess(res, {
        message: 'If this email address matches an active account record, an account confirmation recovery code has been distributed.',
        data: null,
    });
});

// POST /auth/reset-password
const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, password } = req.body;
    const result = await authService.resetPassword({ email, otp, password });
    sendSuccess(res, { message: 'Password updated successfully.', data: result });
});

// PATCH /auth/change-password
const changePassword = asyncHandler(async (req, res) => {
    await authService.changePassword(req.user.id, req.body);
    res.clearCookie('refreshToken');
    sendSuccess(res, { message: 'Password modified successfully. All existing active device paths terminated.', data: null });
});

export {
    register,
    resendVerification,
    verifyEmail,
    login,
    verify2fa,
    refresh,
    logout,
    getMe,
    forgotPassword,
    resetPassword,
    changePassword,
};