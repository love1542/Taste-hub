import { useMutation } from "@tanstack/react-query"
import { loginWithEmail } from "../services"
import { loginUserStorage } from "../types/auth.types"
import { STORAGE_KEYS, storageService } from "../../../services/storageService"

export const useLogin = () => {
  return useMutation({
    mutationFn: loginWithEmail,
  });
};