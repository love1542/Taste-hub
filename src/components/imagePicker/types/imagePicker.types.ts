
export type PickedImage =
    | { type: 'default'; id: string }
    | { type: 'uri'; uri: string| undefined }; 
