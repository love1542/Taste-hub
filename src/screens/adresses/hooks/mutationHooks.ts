import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDeliveryAddress, deleteDeliveryAddress, setDefaultDeliveryAddress } from "../../../services/appApiService"

export const useAddAddress = () => {
    const qurry = useQueryClient()
    return useMutation({
        mutationFn: addDeliveryAddress,
        onSuccess: ()=>{
            qurry.invalidateQueries({queryKey: ["allAddress"]})
        }
    })
}

export const useDeleteAddress = () => {
    const qurry = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteDeliveryAddress(id),
        onSuccess: () => {
            qurry.invalidateQueries({ queryKey: ["allAddress"] })
        }
    })
}

export const useSetDefaultAddress = () => {
    const qurry = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => setDefaultDeliveryAddress(id),
        onSuccess: () => {
            qurry.invalidateQueries({ queryKey: ["allAddress"] })
        }
    })
}