import { Router } from 'express';
import validate from '../../middlewares/validate.middleware.js';
import protect from '../../middlewares/auth.middleware.js';
import {
    registerSchema,
    resendVerificationSchema,
    loginSchema,
    verifyOtpSchema,
    verify2faSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema,
} from './auth.validation.js';
import * as ctrl from './auth.controller.js';

const router = Router();

// ─── Public Scope Authentication Endpoints ───
router.post('/register',            validate(registerSchema),           ctrl.register);
router.post('/resend-verification', validate(resendVerificationSchema), ctrl.resendVerification);
router.post('/verify-email',        validate(verifyOtpSchema),          ctrl.verifyEmail);
router.post('/login',               validate(loginSchema),              ctrl.login);
router.post('/verify-2fa',          validate(verify2faSchema),          ctrl.verify2fa);
router.post('/refresh',                                                 ctrl.refresh);
router.post('/forgot-password',     validate(forgotPasswordSchema),     ctrl.forgotPassword);
router.post('/reset-password',      validate(resetPasswordSchema),      ctrl.resetPassword);

// ─── Protected Scope Authorized Middleware ───
router.get('/me',                   protect,                            ctrl.getMe);
router.patch('/change-password',    protect, validate(changePasswordSchema), ctrl.changePassword);
router.post('/logout',              protect,                            ctrl.logout);

export default router;