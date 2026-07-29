import { storageService, STORAGE_KEYS } from "../../../services/storageService"
import { ApiResponse, mockApi } from "../../../utilites/apis/mockApi"
import { EmailLoginForm, OtpForm, SignupForm, loginUserStorage, phoneformOtp } from "../types/auth.types"
import uuid from 'react-native-uuid'

export const loginWithEmail = async (cardentials: EmailLoginForm): Promise<ApiResponse<loginUserStorage>> => {
  const allusers = (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? []

  const loginUser: SignupForm[] = allusers.filter((item) => item.email === cardentials.email)

  if (loginUser.length === 0) {
    return mockApi({
      success: false,
      message: "Invalid Cardentials"
    })
  }

  return mockApi<loginUserStorage>({
    data: {
      token: uuid.v4(),
      userId: loginUser[0].id
    },
    success: true,
    message: "Login Successfully"
  })

}

export const loginWithPhone = async (phone: string): Promise<ApiResponse<loginUserStorage>>  => {

  const allusers = (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? []
  const exit = allusers.some((user) => user.phone === phone)

  if (exit) {
    return await mockApi({
      success: true,
      message: 'Otp send on your number'
    })
  } else {
    return await mockApi({
      success: false,
      message: 'Invalid Cardentials'
    })
  }

}

export const loginAccountPhone = async (cardentials: phoneformOtp): Promise<ApiResponse<loginUserStorage>> => {
  if (cardentials.otp != "123321") {
    return await mockApi({
      message: 'Enter Valid Otp',
      success: false
    })
  }

  let allusers = (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? []
  const userId = allusers.find((item) => item.phone === cardentials.phone)?.id ?? ""

  return await mockApi<loginUserStorage>({
    data: {
      token: uuid.v4(),
      userId: userId
    },
    message: 'login Successfully',
    success: true
  })
}