export type AddressLabel = 'home' | 'work' | 'other';

export interface DeliveryAddress {
  id: string;
  userId: string;

  label: AddressLabel;

  receiverName: string;
  receiverPhone: string;

  addressLine: string;
  area?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode?: string;

  latitude: number;
  longitude: number;

  isDefault: boolean;

  createdAt: string;
  updatedAt: string;
}

export type AddAddressForm = {
    receiverName: string
    receiverPhone: string
    addressLine: string
    area: string
    landmark: string
    city: string
    state: string
    postalCode: string
}