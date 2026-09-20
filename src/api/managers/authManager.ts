import { ApiResponse } from "../../utilites/apis/mockApi"
import { ApiClient } from "../apiClient"
import { CompleteRegistrationRequest, CompleteRegistrationResponse, OtpVerifyRequest, OtpVerifyResponse, RegisterRequest, RegisterResponse } from "../dto/auth.dto"
import { END_POINT } from "../endPoint"


type AuthManagerType = {
    register: (data: RegisterRequest) => Promise<ApiResponse<RegisterResponse>>
    verifyOtp: (req: OtpVerifyRequest) => Promise<ApiResponse<OtpVerifyResponse>>
}

export const authManager: AuthManagerType = {
    register: async (data: RegisterRequest) => { 
        let response = await ApiClient.post(END_POINT.auth.register, data);
        return response.data
    },

    verifyOtp: async (req: OtpVerifyRequest) => {
        let response = await ApiClient.post(END_POINT.auth.otpVerify, req)
        return response.data    
    }
}