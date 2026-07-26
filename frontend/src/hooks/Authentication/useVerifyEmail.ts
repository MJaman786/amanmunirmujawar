import { useMutation } from "@tanstack/react-query";
import { VERIFY_EMAIL } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type VerifyEmailPayload = {
    email: string;
    otp: string;
};

interface Prop {
    payload: VerifyEmailPayload;
}

const verifyEmail = async ({ payload }: Prop) => {
    const res = await makeRequest({
        pathname: VERIFY_EMAIL,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useVerifyEmail() {
    return useMutation({
        mutationFn: verifyEmail
    });
}