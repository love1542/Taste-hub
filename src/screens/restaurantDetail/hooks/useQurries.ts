import { useQuery } from "@tanstack/react-query";
import { getRestaurantById, getRestaurantMenu } from "../../../services/appApiService";

 export const useGetRestaurantById = (id: string) => {
    return useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => getRestaurantById(id),
    })
 }

 export const useGetRestaurantMenu = (restaurantId: string) => {
    return useQuery({
        queryKey: ['restaurantMenu', restaurantId],
        queryFn: () => getRestaurantMenu(restaurantId),
    })
 }