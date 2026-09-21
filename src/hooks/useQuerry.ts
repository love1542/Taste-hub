import { useQuery } from "@tanstack/react-query"
import { SelectionManager } from "../api/managers/selectionManager"
import { QUERY_KEYS } from "../constants/appConstants/qurryKeys"

export const useGetDefaultImages = () => {
    return useQuery({
        queryKey: QUERY_KEYS.defaultImages,
        queryFn: SelectionManager.getDefaultImages,
        staleTime: 30 * 60 * 1000,
        gcTime: 5 * 60 * 60 * 1000
    })
}