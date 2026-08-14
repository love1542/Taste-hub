import { restaurants } from "../data/Restaurants.data"
import { ApiResponse, mockApi, PaginatedResponse } from "../utilites/apis/mockApi"
import { CuisineId, Restaurant } from "../data/types"
import { FOOD_CATEGORIES } from "../data/Categories.data"
import { foods } from "../data/food.data"
import { RestaurantMenu } from "../screens/restaurantDetail/types/types"
import { SignupForm } from "../screens/auth/types/auth.types"
import { STORAGE_KEYS, storageService } from "./storageService"
import { DeliveryAddress } from "../screens/adresses/types/adress.type"

export type GetRestaurantsRequestParam = {
    page: number,
    limit: number,
    cuisine?: CuisineId
}
export const getRestaurants = async ({ page, limit, cuisine }: GetRestaurantsRequestParam): Promise<PaginatedResponse<Restaurant[]>> => {

    const allRestaurants = cuisine ? restaurants.filter((item) => item.cuisineIds.includes(cuisine)) ?? [] : restaurants

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
            hasNextPage: page < totalPages - 1,
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

export const getRestaurantById = async (id: string): Promise<ApiResponse<Restaurant>> => {
    const restaurant = restaurants.find((item) => item.id === id)

    if (!restaurant) {
        return mockApi({
            success: false,
            message: 'Restaurant not found',
            delay: 2000,
        });
    }

    return mockApi({
        data: restaurant,
        success: true,
        message: 'Restaurant fetched successfully',
        delay: 2000,
    });
}

export const getRestaurantMenu = async (restaurantId: string): Promise<ApiResponse<RestaurantMenu>> => {
    const restaurantFoods = foods.filter(
        item => item.restaurantId === restaurantId,
    );

    const categoryIds = new Set(restaurantFoods.map((item) => item.categoryId));
    const categories = FOOD_CATEGORIES.filter((category) => categoryIds.has(category.id));

    if (restaurantFoods.length === 0) {
        return mockApi({
            data: {
                categories: [],
                foods: [],
            },
            success: false,
            message: 'No menu found for this restaurant',
        });
    }

    return mockApi({
        data: {
            categories,
            foods: restaurantFoods,
        },
        success: true,
        message: 'Restaurant menu fetched successfully',
        delay: 2500,
    });
};

export const getProfile = async (userID: string): Promise<ApiResponse<SignupForm>> => {
    const allUsers = await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers) ?? []
    const profile = allUsers.find((item) => item.id === userID)

    return await mockApi<SignupForm>({
        data: profile,
        success: true,
        message: 'profile fetch successfully'
    })
}

export const editProfile = async (user: SignupForm): Promise<ApiResponse<undefined>> => {
    try {
        const allUsers = await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers) ?? []

        const updatedUsers = allUsers.map((item) => {
            if (item.id === user.id) {
                return { ...item, ...user }
            }
            return item
        })

        await storageService.set<SignupForm[]>(STORAGE_KEYS.allUsers, updatedUsers)

        return await mockApi({
            message: 'Profile Updated',
            success: true
        })
    } catch (error) {
        console.log("Error to edit profile", error)
        return await mockApi({
            message: 'try again to update',
            success: false
        })
    }
}

export const getDeliveryAddresses = async (): Promise<ApiResponse<DeliveryAddress[]>> => {

    try {
        const data = await storageService.get<DeliveryAddress[]>(STORAGE_KEYS.adresses) ?? []

        return await mockApi({
            data: data,
            message: 'Dilivery Address get successfully',
            success: true
        })
    } catch (error) {
        console.log("error to fetch deliveryAdress", error)
        return await mockApi({
            message: 'Check your InterNet',
            success: false
        })
    }
}

export const addDeliveryAddress = async (address: DeliveryAddress): Promise<ApiResponse<undefined>> => {

    try {
        const alladdresses = await storageService.get<DeliveryAddress[]>(STORAGE_KEYS.adresses) ?? []

        alladdresses.push(address)

        await storageService.set<DeliveryAddress[]>(STORAGE_KEYS.adresses, alladdresses)

        return await mockApi({
            message: 'deliveryAdress added',
            success: true
        })
    } catch (error) {
        console.log("error to add deliveryAdress", error)
        return await mockApi({
            message: 'Check your InterNet',
            success: false
        })
    }
}