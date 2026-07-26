import { useMutation } from "@tanstack/react-query";
import { CHANGE_PASSWORD } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type ChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

interface Prop {
    payload: ChangePasswordPayload;
}

const changePassword = async ({ payload }: Prop) => {
    const res = await makeRequest({
        pathname: CHANGE_PASSWORD,
        method: 'PATCH', // Matches backend routing structure
        showMessage: true,
        values: { ...payload },
        token: true // Pass bearer token context parameter
    });
    return res;
};

export default function useChangePassword() {
    return useMutation({
        mutationFn: changePassword
    });
}