import { useMutation } from "@tanstack/react-query";
import { VERIFY_2FA } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type Verify2FAPayload = {
    email: string;
    otp: string;
};

interface Prop {
    payload: Verify2FAPayload;
}

export type UserProfile = {
    _id: string;
    name: string;
    email: string;
    role: "USER" | "RESELLER" | "COMPANY" | "ADMIN" | "SUPER_ADMIN";
    avatar: string | null;
    isEmailVerified: boolean;
    lastLogin: string | null;
};

export type AuthTokensResponse = {
    accessToken: string;
    user: UserProfile;
};

const verify2FAChallenge = async ({ payload }: Prop) => {
    // Returns access tokens alongside profile context
    const res = await makeRequest<AuthTokensResponse>({
        pathname: VERIFY_2FA,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useVerify2FA() {
    return useMutation({
        mutationFn: verify2FAChallenge
    });
}