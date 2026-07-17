import { uuid } from "zod/v4-mini";
import { mockApi } from "../../../utilites/apis/mockApi";
import { EmailStepForm, OtpForm, profileStepForm } from "../types/auth.types";

export const registerCardential = async (data: EmailStepForm) =>{
   return mockApi({
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

export const verifyProfile = async (profileData: profileStepForm) =>{
    return mockApi({
        data:{
            token: uuid.toString(),
            profileData: profileData
        },
        message: 'Account Created Succussfully',
        success: true
    })
}