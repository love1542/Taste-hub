import { useQuery } from "@tanstack/react-query"
import { getDeliveryAddresses } from "../../../services/appApiService"

export const useGetAddress = () => {

    return useQuery({
        queryKey: ['allAddress'],
        queryFn: () => getDeliveryAddresses()
    })
}