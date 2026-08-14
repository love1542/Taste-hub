import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
    showOnboarding: '@onboarding',
    allUsers: '@allUsers',
    loginUser: '@loginUser',
    locations: '@locations',
    adresses: '@adresses',
} as const;

export type StorageKeysType = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

export const storageService = {
    set: async <T,>(key: StorageKeysType, value: T): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.log(`error to set value in local ${error}`)
            return false
        }
    },

    get: async <T,>(key: StorageKeysType): Promise<T | null> => {
        try {
            const data = await AsyncStorage.getItem(key);
            if (data === null) return null;
            return JSON.parse(data) as T;
        } catch (error) {
            console.log(`error getting value from storage: ${error}`);
            return null;
        }
    },

    remove: async (key: StorageKeysType): Promise<boolean> => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.log(`error removing value from storage: ${error}`);
            return false;
        }
    },

    clearAll: async (): Promise<boolean> => {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            console.log(`error clearing storage: ${error}`);
            return false;
        }
    },
};