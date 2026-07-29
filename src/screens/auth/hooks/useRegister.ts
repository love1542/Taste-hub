import { useMutation } from "@tanstack/react-query"
import { registerCredentials, verifyOtp, createAccount } from "../services"
import { useAuth } from "../../../hooks"

export const useSignupCredentials = () => {
    return useMutation({
        mutationFn: registerCredentials
    })
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: verifyOtp
    })
}

export const useCreateAccount = () => {
    const {login} = useAuth()
    return useMutation({
        mutationFn: createAccount,
        onSuccess: (response)=>{
            const token = response.data?.token
            const userId = response.data?.userId

            if (!token || !userId) {
                console.log("unable to login due to missing", response)
                return
            }

            login({token, userId})
        }
    })
}