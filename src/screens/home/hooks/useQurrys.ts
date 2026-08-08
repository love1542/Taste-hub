import { useQuery } from "@tanstack/react-query"
import { getRestaurants, GetRestaurantsRequestParam } from "../../../services/appApiService"
import { getLocationsWithQuery, getLocationWithLatLong } from "../../../services/locationService"

export const useGetRestaurants = ({ page, limit, cuisine }: GetRestaurantsRequestParam) => {
    return useQuery({
         queryKey: ["all_Restaurants", page, limit, cuisine],
         queryFn: () =>  getRestaurants({page, limit, cuisine})
    })
}

export const useGetLocations = (query: string) => {
    return useQuery({
        queryKey: ["search_Locations", query],
        queryFn: () =>  getLocationsWithQuery(query)
    })
}