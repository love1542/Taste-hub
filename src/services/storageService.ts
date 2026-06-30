import { createAsyncStorage } from "@react-native-async-storage/async-storage/jest";

export const STORAGE_KEYS = {
  showOnboarding: '@onboarding',
}as const;

export type StorageKeysType= typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]
export const appStorage = createAsyncStorage('my_app_database');

export const storageService = {
    
    set: async (key: StorageKeysType, value: any)=>{
        try{
         const storedValue = typeof value == "object" ? JSON.stringify(value) : String(value)
         await appStorage.setItem(key, value)
         return true
        } catch{
            console.log('error to set value in local')
            return false
        }
    },

    get: async(key: StorageKeysType) => {
        try {
            const data = await appStorage.getItem(key)
            if (data === null) return null

            if (data.startsWith('{') || data.startsWith('[')) {
        return JSON.parse(data);
      }
      return data
        } catch {
            console.log("error while get data")
            return null
        }
    }
}