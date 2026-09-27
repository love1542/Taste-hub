import { useMutation } from "@tanstack/react-query"
import { loginWithEmail, loginWithPhone, loginAccountPhone } from "../services"
import { useAuth } from "../../../hooks";
import { authManager } from "../../../api/managers/authManager";
import { TokenManager } from "../../../services/tokenManager/tokenManager";

export const uselogin = () => {
  const {login} = useAuth()
  return useMutation({
    mutationFn: authManager.login,
    onSuccess: (response) => {
      const token = response.data.accessToken
      TokenManager.saveAccessToken(token)

      login({ token })
    }
  });
};

// export const useloginWithPhone = () => {
//   return useMutation({
//     mutationFn: loginWithPhone
//   });
// };

export const useloginVerifyOtp = () => {
  const {login} = useAuth()
  return useMutation({
    mutationFn: loginAccountPhone,
    onSuccess: (response) => {
      const token = response.data?.token

      if (!token ) {
        console.log('Login response missing token/userId', response)
        return 
      }

      login({ token })
    }
  });
};

