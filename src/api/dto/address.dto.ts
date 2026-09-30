export interface DeliveryAddressResponse {
    id: string;
    userId: string;
    label: 'home' | 'work' | 'other';
    receiverName: string;
    receiverPhone: string;
    addressLine: string;
    area?: string;
    landmark?: string;
    city: string;
    state: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}