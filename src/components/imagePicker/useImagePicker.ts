import ImageCropPicker, { Image, openCamera } from "react-native-image-crop-picker"

export enum ImagePickerType {
    Camera = 'camera',
    Gallery = 'gallery'
}

export const useImagePicker = () => {

    const pickImage = async (imagePickerType: ImagePickerType): Promise<Image | null> => {
        switch (imagePickerType) {
            case ImagePickerType.Camera:
                try {
                    return await ImageCropPicker.openCamera({
                        width: 400,
                        height: 400,
                        cropping: true,
                        mediaType: 'photo',
                    });
                } catch (error) {
                    console.log(error)
                    return null
                }

            case ImagePickerType.Gallery:
                try {
                    return await ImageCropPicker.openPicker({
                        width: 400,
                        height: 400,
                        cropping: true,
                        mediaType: 'photo',
                    })
                } catch (error) {
                    console.log(error)
                    return null
                }

        }
    }

    const openCamera = async (): Promise<Image | null> => {
        try {
            return await ImageCropPicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,
                mediaType: 'photo',
            });
        } catch (error) {
            console.log(error)
            return null
        }
    }


    const openGallery = async (): Promise<Image | null> => {
        try {
            return await ImageCropPicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
                mediaType: 'photo',
            })
        } catch (error) {
            console.log(error)
            return null
        }
    }

    return {
        openGallery,
        openCamera,
        pickImage
    }
}