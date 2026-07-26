const swaggerDocument = {
    openapi: '3.0.3',
    info: {
        title: 'Systems API',
        version: '1.0.0',
        description: 'Production-grade Swagger documentation for the backend authentication pipeline and app ecosystem.'
    },
    servers: [
        {
            url: '/api/v1',
            description: 'Local development server'
        }
    ],
    tags: [
        { name: 'Health', description: 'Server status and landing routes' },
        { name: 'Auth', description: 'Authentication, 2-Step Verification, and Session management' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            ApiSuccess: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    statusCode: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'Request successful' },
                    timestamp: { type: 'string', format: 'date-time' },
                    data: { type: 'object', nullable: true }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: false },
                    statusCode: { type: 'integer', example: 400 },
                    message: { type: 'string', example: 'Validation failed' },
                    timestamp: { type: 'string', format: 'date-time' },
                    data: { type: 'object', nullable: true }
                }
            },
            AuthRegisterRequest: {
                type: 'object',
                required: ['name', 'email', 'password', 'confirmPassword', 'role'],
                properties: {
                    name: {
                        type: 'string',
                        minLength: 2,
                        maxLength: 50,
                        example: 'John Doe'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com'
                    },
                    password: {
                        type: 'string',
                        minLength: 6,
                        example: 'SecurePass123'
                    },
                    confirmPassword: {
                        type: 'string',
                        example: 'SecurePass123'
                    },
                    phone: {
                        type: 'string',
                        nullable: true,
                        example: '+919876543210'
                    },
                    role: {
                        type: 'string',
                        enum: ['USER', 'RESELLER', 'COMPANY'],
                        description: 'Public registrations are strictly limited to non-admin roles.',
                        example: 'USER'
                    }
                }
            },
            ResendVerificationRequest: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com'
                    }
                }
            },
            VerifyEmailRequest: {
                type: 'object',
                required: ['email', 'otp'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com'
                    },
                    otp: {
                        type: 'string',
                        length: 6,
                        example: '123456'
                    }
                }
            },
            AuthLoginRequest: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'amanmujawar064@gmail.com'
                    },
                    password: {
                        type: 'string',
                        example: 'Aman@1234'
                    }
                }
            },
            Verify2FARequest: {
                type: 'object',
                required: ['email', 'otp'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'amanmujawar064@gmail.com'
                    },
                    otp: {
                        type: 'string',
                        length: 6,
                        example: '654321'
                    }
                }
            },
            ForgotPasswordRequest: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com'
                    }
                }
            },
            ResetPasswordRequest: {
                type: 'object',
                required: ['email', 'otp', 'password', 'confirmPassword'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'john.doe@example.com'
                    },
                    otp: {
                        type: 'string',
                        length: 6,
                        example: '456123'
                    },
                    password: {
                        type: 'string',
                        minLength: 6,
                        example: 'NewSecurePass123'
                    },
                    confirmPassword: {
                        type: 'string',
                        example: 'NewSecurePass123'
                    }
                }
            },
            ChangePasswordRequest: {
                type: 'object',
                required: ['currentPassword', 'newPassword', 'confirmPassword'],
                properties: {
                    currentPassword: {
                        type: 'string',
                        example: 'SecurePass123'
                    },
                    newPassword: {
                        type: 'string',
                        minLength: 6,
                        example: 'BrandNewPass789'
                    },
                    confirmPassword: {
                        type: 'string',
                        example: 'BrandNewPass789'
                    }
                }
            },
            RefreshTokenRequest: {
                type: 'object',
                properties: {
                    refreshToken: {
                        type: 'string',
                        description: 'Optional if sent securely within the HttpOnly cookie context.',
                        example: 'refresh-token-string'
                    }
                }
            }
        }
    },
    paths: {
        '/health': {
            get: {
                tags: ['Health'],
                summary: 'Health check parameters',
                responses: {
                    200: {
                        description: 'Server ecosystem is optimal',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiSuccess' }
                            }
                        }
                    }
                }
            }
        },
        '/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user identity',
                description: 'Handles registration and automatically drops parameters if unverified records exist to clear state deadlocks.',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthRegisterRequest' } } }
                },
                responses: {
                    210: { description: 'Registration successful. Account verification code dispatched.' },
                    400: { description: 'Validation mismatch parameters.' },
                    409: { description: 'Email record conflicts with an active verified account.' }
                }
            }
        },
        '/auth/resend-verification': {
            post: {
                tags: ['Auth'],
                summary: 'Resend email verification OTP token',
                description: 'Enforces a production-grade 60-second rate-limiting window per request block.',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ResendVerificationRequest' } } }
                },
                responses: {
                    200: { description: 'Verification context accepted and distributed securely.' },
                    429: { description: 'Rate limit violation. Please wait 60 seconds before executing a new call.' }
                }
            }
        },
        '/auth/verify-email': {
            post: {
                tags: ['Auth'],
                summary: 'Validate registration code parameters',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/VerifyEmailRequest' } } }
                },
                responses: {
                    200: { description: 'Email state marked verified. Account active.' },
                    400: { description: 'Invalid or expired registration code parameter.' }
                }
            }
        },
        '/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Step 1 login verification',
                description: 'Verifies user email and password. If parameters are valid, generates a short-lived 2FA code and sends it via email.',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthLoginRequest' } } }
                },
                responses: {
                    200: {
                        description: 'Credentials valid. Two-Factor Authentication required to finalize.',
                        content: {
                            'application/json': {
                                example: {
                                    success: true,
                                    statusCode: 200,
                                    message: 'Identity confirmed. Step 2 verification code distributed to email.',
                                    data: { requires2FA: true, email: 'john.doe@example.com' }
                                }
                            }
                        }
                    },
                    401: { description: 'Authentication credentials rejected.' },
                    403: { description: 'Account status exception (BANNED, INACTIVE, or UNVERIFIED).' }
                }
            }
        },
        '/auth/verify-2fa': {
            post: {
                tags: ['Auth'],
                summary: 'Step 2 login token verification',
                description: 'Validates 2FA code, records real-time device footprints, passes bearer access tokens, and sets HttpOnly cookies.',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Verify2FARequest' } } }
                },
                responses: {
                    200: {
                        description: '2-Step verification successful.',
                        headers: { 'Set-Cookie': { description: 'Secure HttpOnly refresh token cookie tracking.' } },
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiSuccess' } } }
                    },
                    400: { description: 'Invalid or expired 2FA credentials payload.' },
                    429: { description: 'Brute-force limit hit (5 attempts maximum).' }
                }
            }
        },
        '/auth/refresh': {
            post: {
                tags: ['Auth'],
                summary: 'Rotate active credentials using refresh tokens',
                description: 'Evaluates secure token rotation strategies (RTR) to block token-theft reuse conditions.',
                requestBody: {
                    required: false,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshTokenRequest' } } }
                },
                responses: {
                    200: {
                        description: 'Tokens rotated successfully.',
                        headers: { 'Set-Cookie': { description: 'New rotated HttpOnly token reference drop.' } }
                    },
                    401: { description: 'Refresh token invalid, missing, or compromised.' }
                }
            }
        },
        '/auth/forgot-password': {
            post: {
                tags: ['Auth'],
                summary: 'Request recovery code',
                description: 'Maintains strict generic output logs to avoid user listing vulnerabilities.',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ForgotPasswordRequest' } } }
                },
                responses: {
                    200: { description: 'Recovery process tracking initialized smoothly.' }
                }
            }
        },
        '/auth/reset-password': {
            post: {
                tags: ['Auth'],
                summary: 'Reset password via recovery token',
                description: 'Validates recovery OTP. Updates values and terminates all active device sessions for breach containment.',
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ResetPasswordRequest' } } }
                },
                responses: {
                    200: { description: 'Account password reset complete.' },
                    400: { description: 'Invalid recovery tracking parameters or token expired.' }
                }
            }
        },
        '/auth/me': {
            get: {
                tags: ['Auth'],
                summary: 'Get active identity profiles',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Parsed token model matches structural definitions.' },
                    401: { description: 'Bearer credentials tracking missing or expired.' }
                }
            }
        },
        '/auth/change-password': {
            patch: {
                tags: ['Auth'],
                summary: 'Modify account password parameters',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/ChangePasswordRequest' } } }
                },
                responses: {
                    200: { description: 'Password reset completed. Cookies cleared.' },
                    401: { description: 'Bearer signature verification failed.' }
                }
            }
        },
        '/auth/logout': {
            post: {
                tags: ['Auth'],
                summary: 'Terminate user token sessions',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: 'Session parameters marked revoked inside persistence layer.' },
                    401: { description: 'Invalid token reference parameters.' }
                }
            }
        }
    }
};

export default swaggerDocument;