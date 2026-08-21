import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDeliveryAddress } from "../../../services/appApiService"

export const useAddAddress = () => {
    const qurry = useQueryClient()
    return useMutation({
        mutationFn: addDeliveryAddress,
        onSuccess: ()=>{
            qurry.invalidateQueries({queryKey: ["allAdresses"]})
        }
    })
}