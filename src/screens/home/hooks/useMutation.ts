import { useMutation } from "@tanstack/react-query"
import { toggleFavourite } from "../../../services/appApiService"

export const useToggleFavourite = () => {
   return useMutation({
        mutationFn: toggleFavourite,
    })
}