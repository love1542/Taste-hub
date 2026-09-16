import axios, { AxiosInstance } from 'axios'
import Config from "react-native-config"

export const ApiClient: AxiosInstance = axios.create({
    baseURL: Config.API_BASE_URL,
    timeout: 1500,
    headers: {'Content-Type': 'application/json'}
})