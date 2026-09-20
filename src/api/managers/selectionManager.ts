import { ApiResponse } from "../../utilites/apis/mockApi"
import { ApiClient } from "../apiClient"
import { DefaultImagesResponse } from "../dto/selection.dto"
import { END_POINT } from "../endPoint"

type SelectionManagerType = {
    getDefaultImages: () => Promise<ApiResponse<DefaultImagesResponse>>
}

export const SelectionManager: SelectionManagerType = {
    getDefaultImages: async () => {
        const response = await ApiClient.get(END_POINT.selections.getDefaultImages)

        return response.data
    }
}