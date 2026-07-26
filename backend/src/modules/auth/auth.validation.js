import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Name must be at least 2 characters',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Please confirm your password',
    }),
    phone: Joi.string().optional().allow(null, ''),
    // ✅ Strictly limit registration roles to non-elevated scopes
    role: Joi.string().valid('USER', 'RESELLER', 'COMPANY').required().messages({
        'any.only': 'Invalid role. Public registration only permits USER, RESELLER, or COMPANY accounts.',
        'any.required': 'Role designation is required',
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});

const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
    otp: Joi.string().length(6).required().messages({
        'string.length': 'OTP must be exactly 6 digits',
        'any.required': 'OTP is required',
    }),
});

const verify2faSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
    otp: Joi.string().length(6).required().messages({
        'string.length': 'OTP must be exactly 6 digits',
        'any.required': 'OTP is required',
    }),
});

const resendVerificationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
    otp: Joi.string().length(6).required().messages({
        'string.length': 'OTP must be exactly 6 digits',
        'any.required': 'OTP is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    }),
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'any.required': 'Current password is required',
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'New password is required',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Passwords do not match', 
    }),
});

export {
    registerSchema,
    loginSchema,
    verifyOtpSchema,
    verify2faSchema,
    resendVerificationSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema,
};