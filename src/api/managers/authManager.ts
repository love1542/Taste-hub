import { ApiResponse } from "../../utilites/apis/mockApi"
import { ApiClient } from "../apiClient"
import { CompleteRegistrationRequest, CompleteRegistrationResponse, OtpVerifyRequest, OtpVerifyResponse, RegisterRequest, RegisterResponse } from "../dto/auth.dto"
import { END_POINT } from "../endPoint"


type AuthManagerType = {
    register: (data: RegisterRequest) => Promise<ApiResponse<RegisterResponse>>
    verifyOtp: (req: OtpVerifyRequest) => Promise<ApiResponse<OtpVerifyResponse>>
    completeRegistration: (req: CompleteRegistrationRequest) => Promise<ApiResponse<CompleteRegistrationResponse>>
}

export const authManager: AuthManagerType = {
    register: async (data: RegisterRequest) => {
        const response = await ApiClient.post(END_POINT.auth.register, data);
        return response.data
    },

    verifyOtp: async (req: OtpVerifyRequest) => {
        const response = await ApiClient.post(END_POINT.auth.otpVerify, req)
        return response.data
    },

    completeRegistration: async (req: CompleteRegistrationRequest) => {
        const form = new FormData()

        form.append("fullName", req.fullName)
        form.append("dateOfBirth", req.dateOfBirth)
        form.append("gender", req.gender)
        form.append("deviceId", req.deviceId)

        if (req.imageType === "default") {
            form.append("imageId", req.imageId)
        }

        form.append("profileImage", {
            uri: req.profileImage,
            type: "image/jpeg",
            name: "profile.jpg",
        });

        const response = await ApiClient.post(END_POINT.auth.completeRegistration, form)
        return response.data
    }
}