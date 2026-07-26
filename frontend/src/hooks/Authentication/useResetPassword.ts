import { useMutation } from "@tanstack/react-query";
import { RESET_PASSWORD } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type ResetPasswordPayload = {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
};

interface Prop {
    payload: ResetPasswordPayload;
}

const resetPassword = async ({ payload }: Prop) => {
    const res = await makeRequest({
        pathname: RESET_PASSWORD,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useResetPassword() {
    return useMutation({
        mutationFn: resetPassword
    });
}