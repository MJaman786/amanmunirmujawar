import { useMutation } from "@tanstack/react-query";
import { FORGOT_PASSWORD } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type ForgotPasswordPayload = {
    email: string;
};

interface Prop {
    payload: ForgotPasswordPayload;
}

const forgotPassword = async ({ payload }: Prop) => {
    const res = await makeRequest({
        pathname: FORGOT_PASSWORD,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useForgotPassword() {
    return useMutation({
        mutationFn: forgotPassword
    });
}