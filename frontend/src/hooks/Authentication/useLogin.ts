import { useMutation } from "@tanstack/react-query";
import { LOGIN } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type LoginPayload = {
    email: string;
    password: string;
};

interface Prop {
    payload: LoginPayload;
}

export type LoginResponse = {
    requires2FA: boolean;
    email: string;
};

const loginChallenge = async ({ payload }: Prop) => {
    // Expects a return shape prompting for Step 2 Verification
    const res = await makeRequest<LoginResponse>({
        pathname: LOGIN,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useLogin() {
    return useMutation({
        mutationFn: loginChallenge
    });
}