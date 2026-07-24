import { useMutation } from "@tanstack/react-query"
import { loginWithEmail, loginWithPhone, loginAccountPhone } from "../services"

export const useEmailLogin = () => {
  return useMutation({
    mutationFn: loginWithEmail,
  });
};

export const useloginWithPhone = () => {
  return useMutation({
    mutationFn: loginWithPhone
  });
};

export const useloginVerifyOtp = () => {
  return useMutation({
    mutationFn: loginAccountPhone
  });
};