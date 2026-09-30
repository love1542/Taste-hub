import { ApiClient } from "../apiClient"
import { DeliveryAddressResponse } from "../dto/address.dto"
import { ProfileResponse } from "../dto/profile.dto"
import { END_POINT } from "../endPoint"
import { ApiResponse } from "../../utilites/apis/mockApi"

type UserManagerType = {
    getProfile: (userID: string) => Promise<ApiResponse<ProfileResponse>>
    getDeliveryAddresses: () => Promise<ApiResponse<DeliveryAddressResponse[]>>
}

export const userManager: UserManagerType = {
    getProfile: async (_userID: string) => {
        const response = await ApiClient.get(END_POINT.profile.get)
        return response.data
    },

    getDeliveryAddresses: async () => {
        const response = await ApiClient.get(END_POINT.addresses.get)
        return response.data
    },
}