// ─── AUTH ENDPOINTS ────────────────────────────────────────────
// ─── BASE ROUTE SUFFIX ─────────────────────────────────────────
export const AUTH_BASE = '/auth';

export const REGISTER            = `${AUTH_BASE}/register`;
export const RESEND_VERIFICATION = `${AUTH_BASE}/resend-verification`;
export const VERIFY_EMAIL        = `${AUTH_BASE}/verify-email`;
export const LOGIN               = `${AUTH_BASE}/login`;
export const VERIFY_2FA          = `${AUTH_BASE}/verify-2fa`;
export const REFRESH             = `${AUTH_BASE}/refresh`;
export const FORGOT_PASSWORD     = `${AUTH_BASE}/forgot-password`;
export const RESET_PASSWORD      = `${AUTH_BASE}/reset-password`;
export const GET_ME              = `${AUTH_BASE}/me`;
export const CHANGE_PASSWORD     = `${AUTH_BASE}/change-password`;
export const LOGOUT              = `${AUTH_BASE}/logout`;