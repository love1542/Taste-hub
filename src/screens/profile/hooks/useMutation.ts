import {useMutation, useQueryClient} from '@tanstack/react-query'
import { editProfile } from '../../../services/appApiService'
import { SignupForm } from '../../auth/types/auth.types';
 
export const useEditProfile = (userID: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: SignupForm) => editProfile(user),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['Profile', userID] });
      }
    },
  });
};