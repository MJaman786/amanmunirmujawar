// frontend/src/hooks/Authentication/useRefreshToken.ts
import axios from "axios";
import { useAuthStore } from "../../store/Auth/useAuthStore";
import type { ApiResponse } from "../../types/MakeRequest";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:9000";

/**
 * Dispatches a silent token rotation request to the backend.
 * Uses withCredentials to safely transmit HttpOnly cookies.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const response = await axios.post<ApiResponse<{ accessToken: string }>>(
            `${API_BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true } // Permits the secure HttpOnly cookie to pass over the network
        );

        if (response.data?.success) {
            const newAccessToken = response.data.data.accessToken;
            const currentUser = useAuthStore.getState().user;

            // ✅ Fixed: Changed 'user' to 'currentUser' to match the variable above
            if (currentUser) {
                // Keep the state fresh in your Zustand store
                useAuthStore.getState().login(currentUser, newAccessToken);
            }
            return newAccessToken;
        }
    } catch (error) {
        console.error("Token rotation failed:", error);
    }
    return null;
};