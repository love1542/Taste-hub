import { useMutation } from "@tanstack/react-query"
import { authManager } from "../api/managers/authManager"
import { TokenManager } from "../services/tokenManager/tokenManager"

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: authManager.verifyOtp,
        onSuccess(data) {
            if (data.data.access_token) {
                TokenManager.saveAccessToken(data.data.access_token)
            }
        },
    })
}