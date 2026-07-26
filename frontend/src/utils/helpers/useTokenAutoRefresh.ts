// frontend/src/hooks/Authentication/useTokenAutoRefresh.ts
import { useEffect } from "react";
import { useAuthStore } from "../../store/Auth/useAuthStore";
import { refreshAccessToken } from "./useRefreshToken";

export default function useTokenAutoRefresh() {
    const token = useAuthStore((state) => state.token);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn || !token) return;

        try {
            // 1. Decode the access token payload locally to extract expiration metrics
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(window.atob(base64));
            
            const expirationTimeMs = payload.exp * 1000;
            const currentTimeMs = Date.now();
            
            // 2. Set an offset window to refresh 30 seconds BEFORE absolute 10-minute expiry (9.5m)
            const bufferMs = 30 * 1000; 
            const timeUntilRefresh = expirationTimeMs - currentTimeMs - bufferMs;

            // 3. If a reload happens past 9.5 minutes, delay falls to 0ms for an immediate refresh
            const delay = timeUntilRefresh > 0 ? timeUntilRefresh : 0;

            console.log(`[Session] Token refresh scheduled in ${Math.round(delay / 1000)} seconds.`);

            const timerId = setTimeout(() => {
                refreshAccessToken();
            }, delay);

            // 4. Teardown active timeout instances if the user logs out or the token rotates
            return () => clearTimeout(timerId);

        } catch (error) {
            console.error("Failed to parse token lifecycle timestamps:", error);
        }
    }, [token, isLoggedIn]);
}