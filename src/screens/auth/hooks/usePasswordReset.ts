import { useMutation } from "@tanstack/react-query"
import { authManager } from "../../../api/managers/authManager"

export const useForgotPassword = () => useMutation({
    mutationFn: authManager.forgotPassword
})

export const useResetPassword = () => useMutation({
    mutationFn: authManager.resetPassword
})
