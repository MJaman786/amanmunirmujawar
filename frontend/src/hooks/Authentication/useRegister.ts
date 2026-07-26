import { useMutation } from "@tanstack/react-query";
import { REGISTER } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string | null;
    role: "USER" | "RESELLER" | "COMPANY";
};

interface Prop {
    payload: RegisterPayload;
}

const registerUser = async ({ payload }: Prop) => {
    const res = await makeRequest({
        pathname: REGISTER,
        method: 'POST',
        showMessage: true,
        values: { ...payload },
        token: false
    });
    return res;
};

export default function useRegister() {
    return useMutation({
        mutationFn: registerUser
    });
}