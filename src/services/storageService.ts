import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  showOnboarding: '@onboarding',
}as const;

export type StorageKeysType= typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

export const storageService = {
    
    set: async (key: StorageKeysType, value: any)=>{
        try{
         const storedValue = typeof value == "object" ? JSON.stringify(value) : String(value)
         await AsyncStorage.setItem(key, storedValue)
         return true
        } catch (error) {
            console.log(`error to set value in local ${error}`)
            return false
        }
    },

    get: async(key: StorageKeysType) => {
        try {
            const data = await AsyncStorage.getItem(key)
            if (data === null) return null

            if (data.startsWith('{') || data.startsWith('[')) {
        return JSON.parse(data);
      }
      return data
        } catch (error) {
            console.log(`error while get data ${error}`)
            return null
        }
    }
}

