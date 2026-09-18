import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import Config from "react-native-config"
import { TokenManager } from '../services/tokenManager/tokenManager'

export const ApiClient: AxiosInstance = axios.create({
    baseURL: Config.API_BASE_URL,
    timeout: 1500,
})

ApiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
   const accessToken = TokenManager.getAccessToken()

   if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
   }

    return config
})

ApiClient.interceptors.request.use(
  config => {
    console.log('🚀 API REQUEST');
    console.log('URL:', `${config.baseURL}${config.url}`);
    console.log('METHOD:', config.method?.toUpperCase());
    console.log('PARAMS:', config.params);
    console.log('BODY:', config.data);

    return config;
  },
  error => {
    console.log('❌ REQUEST ERROR:', error);
    return Promise.reject(error);
  },
);

ApiClient.interceptors.response.use(
  response => {
    console.log('✅ API RESPONSE');
    console.log('URL:', `${response.config.baseURL}${response.config.url}`);
    console.log('STATUS:', response.status);
    console.log('DATA:', response.data);

    return response;
  },
  error => {
    console.log('❌ API RESPONSE ERROR');
    console.log('URL:', `${error.config?.baseURL}${error.config?.url}`);
    console.log('STATUS:', error.response?.status);
    console.log('DATA:', error.response?.data);

    return Promise.reject(error);
  },
);