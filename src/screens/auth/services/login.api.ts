import { storageService, STORAGE_KEYS } from "../../../services/storageService"
import { mockApi } from "../../../utilites/apis/mockApi"
import { EmailLoginForm, OtpForm, SignupForm, loginUserStorage, phoneformOtp } from "../types/auth.types"
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

export const loginWithPhone = async (phone: string) => {
  return await mockApi({
    success: true,
    message: 'Otp send on your number'
  })
}

export const loginAccountPhone = async (cardentials: phoneformOtp) => {
    if (cardentials.otp != "123321") {
        return await mockApi({
            message: 'Enter Valid Otp',
            success: false
        })
    }

    let allusers = (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? []
    const userId = allusers.find((item)=> item.phone === cardentials.phone)?.id ?? ""
    
    return await mockApi<loginUserStorage>({
        data:{
          token: uuid.v4(),
          userId: userId
        },
        message: 'login Successfully',
        success: true
    })
}