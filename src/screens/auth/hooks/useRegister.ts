import { useMutation } from "@tanstack/react-query"
import { registerCredentials, verifyOtp, createAccount } from "../services"
import { useAuth } from "../../../hooks"
import { authManager } from "../../../api/managers/authManager"
import { TokenManager } from "../../../services/tokenManager/tokenManager"

export const useRegiserUser = () => {
    return useMutation({
        mutationFn: authManager.register
    })
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: authManager.verifyOtp,
        onSuccess(data) {
            TokenManager.saveAccessToken(data.data.access_token)
        },
    })
}

export const useCompleteRegistration = () => {
    const {login} = useAuth()
    return useMutation({
        mutationFn: authManager.completeRegistration,
        onSuccess: (response)=>{
            const token = response.data?.accessToken
            

            if (!token) {
                console.log("unable to login due to missing", response)
                return
            }

            login({token})
        }
    })
}