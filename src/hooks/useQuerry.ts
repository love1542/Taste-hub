import { useQuery } from "@tanstack/react-query"
import { SelectionManager } from "../api/managers/selectionManager"

export const useGetDefaultImages = () => {
    return useQuery({
        queryKey: ["defaultImages"],
        queryFn: SelectionManager.getDefaultImages
    })
}