import { ApiResponse } from "../../utilites/apis/mockApi"
import { ApiClient } from "../apiClient"
import { RegisterRequest, RegisterResponse } from "../dto/auth.dto"
import { END_POINT } from "../endPoint"


type AuthManagerType = {
    register: (data: RegisterRequest) => Promise<ApiResponse<RegisterResponse>>
}

export const authManager: AuthManagerType = {
    register: async (data: RegisterRequest) => { 
        let response = await ApiClient.post(END_POINT.auth.register, data);
        return response.data
    }
}