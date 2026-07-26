import { useMutation } from "@tanstack/react-query";
import { LOGOUT } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";

const processLogout = async () => {
    const res = await makeRequest({
        pathname: LOGOUT,
        method: 'POST',
        showMessage: true,
        token: true
    });
    return res;
};

export default function useLogout() {
    return useMutation({
        mutationFn: processLogout
    });
}