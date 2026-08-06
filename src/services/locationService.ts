import { NominatimReverseResponseDto, NominatimSearchResponseDto } from "../dto/location"
import Geolocation from 'react-native-geolocation-service';

export const getLocationsWithQuery = async (query: string): Promise<NominatimSearchResponseDto[]> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&countrycodes=in&addressdetails=1&limit=10`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'TasteHub/1.0',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};


export const getLocationWithLatLong = async (
  latitude: number,
  longitude: number,
): Promise<NominatimReverseResponseDto> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&addressdetails=1`,
    {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'TasteHub/1.0',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to get address');
  }

  return response.json();
};

export const getCurrentLocation = () =>
  new Promise<any>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });