import { STORAGE_KEYS, storageService } from "../../../services/storageService";
import { mockApi } from "../../../utilites/apis/mockApi";
import { EmailLoginForm, EmailStepForm, loginUserStorage, OtpForm, phoneForm, SignupForm } from "../types/auth.types";
import uuid from 'react-native-uuid';

export const registerCredentials = async (data: EmailStepForm | phoneForm) => {
  const allUsers = (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? []

  const exists = "email" in data
    ? allUsers.some(user => user.email === data.email)
    : allUsers.some(user => user.phone === data.phone);

  if (exists) {
    return await mockApi({
      message: "User already exist",
      success: false
    })
  }

    return await mockApi({
      data,
      message: "cadentials saved",
      success: true
    })
}

export const verifyOtp = async (otp: OtpForm) => {
  if (otp.otp != "123321") {
    return mockApi({
      data: undefined,
      message: 'Enter Valid Otp',
      success: false
    })
  }

  return mockApi({
    data: undefined,
    message: 'Otp verify Successfully',
    success: true
  })
}

export const createAccount = async (formData: SignupForm) => {
  const oldUsers = (await storageService.get<SignupForm[]>(STORAGE_KEYS.allUsers)) ?? [];

  console.log(oldUsers)
  const newUsers = [...oldUsers, formData];
  console.log("new users", newUsers)

  await storageService.set<SignupForm[]>(STORAGE_KEYS.allUsers, newUsers);

  return mockApi<loginUserStorage>({
    data: {
      token: uuid.v4(),
      userId: formData.id ?? "1",
    },
    message: "Account Created Successfully",
    success: true,
  });
};