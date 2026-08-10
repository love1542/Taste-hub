import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../../../services/appApiService"

export const useGetProfile = (userID: string) => {
return useQuery({
    queryKey: ['Profile', userID],
    queryFn: () => getProfile(userID)
})
}