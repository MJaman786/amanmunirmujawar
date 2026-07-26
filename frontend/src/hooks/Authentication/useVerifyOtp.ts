import { useMutation } from "@tanstack/react-query";
import { VERIFY_EMAIL, VERIFY_2FA } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";
import type { User } from "../../types/Auth";

type Payload = {
    email: string;
    otp: string;
    type: 'EMAIL_VERIFICATION' | '2FA';
};

interface Prop {
    payload: Payload;
}

interface ApiResponse {
    accessToken?: string;
    user?: User;
    verified?: boolean;
}

const verifyOtp = async ({ payload }: Prop) => {
    // Select the correct backend controller route based on verification type
    const pathname = payload.type === 'EMAIL_VERIFICATION' ? VERIFY_EMAIL : VERIFY_2FA;
    
    const res = await makeRequest<ApiResponse>({
        pathname: pathname,
        method: 'POST',
        showMessage: true,
        token: false,
        values: { email: payload.email, otp: payload.otp }
    });
    return res;
};

export default function useVerifyOtp() {
    return useMutation({
        mutationFn: verifyOtp
    });
}