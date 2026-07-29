import { useMutation } from "@tanstack/react-query"
import { loginWithEmail, loginWithPhone, loginAccountPhone } from "../services"
import { useAuth } from "../../../hooks";

export const useEmailLogin = () => {
  const {login} = useAuth()
  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (response) => {
      const token = response.data?.token
      const userId = response.data?.userId

      if (!token || !userId) {
        console.log('Login response missing token/userId', response)
        return 
      }

      login({ token, userId })
    }
  });
};

export const useloginWithPhone = () => {
  return useMutation({
    mutationFn: loginWithPhone
  });
};

export const useloginVerifyOtp = () => {
  const {login} = useAuth()
  return useMutation({
    mutationFn: loginAccountPhone,
    onSuccess: (response) => {
      const token = response.data?.token
      const userId = response.data?.userId

      if (!token || !userId) {
        console.log('Login response missing token/userId', response)
        return 
      }

      login({ token, userId })
    }
  });
};

