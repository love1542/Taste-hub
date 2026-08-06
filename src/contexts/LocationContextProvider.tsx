import { createContext, useEffect, useState } from "react";
import { STORAGE_KEYS, storageService } from "../services/storageService";
import { requestLocationPermission } from "../utilites/locationPermissions";

type UserLocation = {
    id: string;
    latitude: number;
    longitude: number;
    address: string;
    selectedLocation: boolean;
    mode: 'current' | 'search';
}

export type LocationContextType = {
    locations: UserLocation[];
    addLocation: (location: UserLocation) => void;
    removeLocation: (id: string) => void;
    setSelectedLocation: (id: string) => void;

    hasLocationPermission: boolean;
    requestPermission: () => Promise<boolean>;
}


export const LocationContext = createContext<LocationContextType | null>(null);

export const LocationContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [locations, setLocations] = useState<UserLocation[]>([])
    const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const savedLocations =
                    await storageService.get<UserLocation[]>(STORAGE_KEYS.locations);

                if (savedLocations) {
                    setLocations(savedLocations);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const initializeLocationPermission = async () => {
            try {
                const granted = await requestLocationPermission();
                setHasLocationPermission(granted);
            } catch (error) {
                console.log('Error initializing location permission:', error);
                setHasLocationPermission(false);
            }
        };

        loadLocations();
        initializeLocationPermission();
    }, []);

    const requestPermission = async (): Promise<boolean> => {
        try {
            const granted = await requestLocationPermission();
            if (granted) {
                setHasLocationPermission(true);
                return true;
            } else {
                setHasLocationPermission(false);
                return false;
            }
        } catch (error) {
            console.log('Error requesting location permission:', error);
            setHasLocationPermission(false);
            return false;
        }
    }

    const addLocation = (location: UserLocation) => {
        try {
            storageService.set<UserLocation[]>(STORAGE_KEYS.locations, [...locations, location])
            setLocations(prev => [...prev, location])
        } catch (error) {
            console.log('error adding location', error)
        }
    }

    const removeLocation = (id: string) => {
        try {
            const updatedLocations = locations.filter(location => location.id !== id);
            storageService.set<UserLocation[]>(STORAGE_KEYS.locations, updatedLocations)
            setLocations(updatedLocations);
        } catch (error) {
            console.log('error removing location', error)
        }
    }

    const setSelectedLocation = (id: string) => {
        try {
            const updatedLocations = locations.map(location => ({
                ...location,
                selectedLocation: location.id === id,
            }));
            storageService.set<UserLocation[]>(STORAGE_KEYS.locations, updatedLocations)
            setLocations(updatedLocations);
        } catch (error) {
            console.log('error setting selected location', error)
        }
    }


    return (
        <LocationContext.Provider value={{ locations, addLocation, removeLocation, setSelectedLocation, requestPermission, hasLocationPermission }}>
            {
                children
            }
        </LocationContext.Provider>
    )
}