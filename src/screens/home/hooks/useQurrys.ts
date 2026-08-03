import { useQuery } from "@tanstack/react-query"
import { getRestaurants, GetRestaurantsRequestParam } from "../../../services/appApiService"

export const useGetRestaurants = ({ page, limit, cuisine }: GetRestaurantsRequestParam) => {
    return useQuery({
         queryKey: ["all_Restaurants", page, limit, cuisine],
         queryFn: () =>  getRestaurants({page, limit, cuisine})
    })
}