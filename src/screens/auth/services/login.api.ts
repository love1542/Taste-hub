import { storageService, STORAGE_KEYS } from "../../../services/storageService"
import { mockApi } from "../../../utilites/apis/mockApi"
import { EmailLoginForm, SignupForm, loginUserStorage } from "../types/auth.types"
import uuid from 'react-native-uuid'

export const loginWithEmail = async (cardentials: EmailLoginForm) =>{
    const allusers = ( await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? []

    const loginUser:SignupForm[] = allusers.filter((item)=> item.email === cardentials.email)

    if (loginUser.length === 0 ) {
      return mockApi({
        success: false,
        message: "Invalid Cardentials"
      })
    }

    return mockApi<loginUserStorage>({
      data:{
        token: uuid.v4(),
        userId: loginUser[0].id
      },
      success: true,
      message: "Login Successfully"
    })

}