import { useMutation } from "@tanstack/react-query"
import { registerCredentials, verifyOtp, createAccount } from "../services"

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
    return useMutation({
        mutationFn: createAccount
    })
}