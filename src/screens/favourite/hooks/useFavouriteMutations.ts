import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleFavourite } from '../../../services/appApiService'
import { FAVOURITES_QUERY_KEY } from './useFavouriteQueries'

export const useToggleFavourite = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => toggleFavourite(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FAVOURITES_QUERY_KEY] })
        },
    })
}
