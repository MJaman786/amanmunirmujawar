import { useMutation } from "@tanstack/react-query";
import { RESEND_VERIFICATION } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type ResendVerificationPayload = {
    email: string;
};

interface Prop {
    payload: ResendVerificationPayload;
}

const resendVerification = async ({ payload }: Prop) => {
    const res = await makeRequest({
        pathname: RESEND_VERIFICATION,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useResendVerification() {
    return useMutation({
        mutationFn: resendVerification
    });
}