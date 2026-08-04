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

    const allRestaurants =  cuisine ? restaurants.filter((item) => item.cuisineIds.includes(cuisine)) ?? [] : restaurants

    const totalPages = Math.ceil(allRestaurants.length / limit);

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
            hasNextPage: page < totalPages - 1 ,
            hasPrevPage: page != 0,
            limit: limit,
            page: page,
            total: allRestaurants.length,
            totalPages: totalPages
        }
    }
}


export const toggleFavourite = async (id: string) => {
    const restaurant = restaurants.find((item) => item.id === id)

    if (!restaurant) {
        return mockApi({
            data: null,
            success: false,
            message: 'Restaurant not found',
            delay: 2000,
        });
    }

    restaurant.isFavourite = !restaurant.isFavourite

    return mockApi({
        data: restaurant,
        success: true,
        message: 'favourite updated successfully',
        delay: 2000,
    });
}