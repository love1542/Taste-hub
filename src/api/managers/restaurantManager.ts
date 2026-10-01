import { ApiClient } from "../apiClient"
import { ApiResponse } from "../../utilites/apis/mockApi"
import { GetRestaurantsRequestParam, RestaurantsResponse } from "../dto/restaurants.dto"
import { END_POINT } from "../endPoint"

type RestaurantManagerType = {
    getRestaurants: (params: GetRestaurantsRequestParam) => Promise<ApiResponse<RestaurantsResponse>>
}

export const restaurantManager: RestaurantManagerType = {
    getRestaurants: async ({ page, limit, search, sortBy, sortOrder }) => {
        const response = await ApiClient.get<ApiResponse<RestaurantsResponse>>(END_POINT.restaurants.get, {
            params: { page, limit, search, sortBy, sortOrder },
        })

        return response.data
    },
}