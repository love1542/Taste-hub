import { NominatimSearchResponseDto } from "../dto/location"

export const getLocations = async ( query: string ): Promise<NominatimSearchResponseDto[]> => {
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