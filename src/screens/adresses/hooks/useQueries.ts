import { useQuery } from "@tanstack/react-query"
import { userManager } from "../../../api/managers/userManager"
import { QUERY_KEYS } from "../../../constants/appConstants/qurryKeys"

export const useGetAddress = () => {

    return useQuery({
        queryKey: QUERY_KEYS.allAddress,
        queryFn: () => userManager.getDeliveryAddresses()
    })
}