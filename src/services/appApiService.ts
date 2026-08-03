import { tr } from "zod/v4/locales"
import { restaurants } from "../data/Restaurants.data"
import { ApiResponse, mockApi, PaginatedResponse } from "../utilites/apis/mockApi"
import { CuisineId, Restaurant } from "../data/types"

export type GetRestaurantsRequestParam = {
    page: number,
    limit: number,
    cuisine?: CuisineId
}
export const getRestaurants = async ({ page, limit, cuisine }: GetRestaurantsRequestParam): Promise<PaginatedResponse<Restaurant[]>> => {

    const getData = (cuisine?: CuisineId) => {
        if (!cuisine) {
            return restaurants;
        }
        return restaurants.filter((item) => item.cuisineIds.includes(cuisine));
    };

    const allRestaurants = getData(cuisine)

    const pages = allRestaurants.length / limit

    const thisPage = page * limit
    const data = allRestaurants.slice(thisPage, thisPage + limit)

    const response = await mockApi({
        data: data,
        success: true,
        message: 'Restaurants fetched successfully',
        delay: 2000,
    });

    return {
        ...response,
        pagination: {
            hasNextPage: page < pages,
            hasPrevPage: page != 0,
            limit: limit,
            page: page,
            total: allRestaurants.length,
            totalPages: pages
        }
    }
}