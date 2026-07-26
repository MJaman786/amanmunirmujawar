import { useQuery } from "@tanstack/react-query";
import { GET_ME } from "../../constants/urls";
import makeRequest from "../../utils/helpers/MakeRequest";
import type { User } from "../../types/Auth";

const fetchUserProfile = async () => {
    const res = await makeRequest<User>({
        pathname: GET_ME,
        method: 'GET',
        token: true
    });
    return res;
};

export default function useGetMe() {
    return useQuery({
        queryKey: ['get-current-user'],
        queryFn: fetchUserProfile,
        // enabled: enabled, // Dynamic execution toggles based on authentication status
        // staleTime: 15 * 60 * 1000, // Trust user model state for 15 minutes locally
    });
}