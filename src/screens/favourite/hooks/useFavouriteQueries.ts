import { useQuery } from '@tanstack/react-query'
import { getFavourites } from '../../../services/appApiService'

export const FAVOURITES_QUERY_KEY = 'favourites'

export const useGetFavourites = () => {
    return useQuery({
        queryKey: [FAVOURITES_QUERY_KEY],
        queryFn: getFavourites,
    })
}
