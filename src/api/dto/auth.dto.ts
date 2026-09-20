export interface RegisterRequest {
    type: "phone" | "email"
    identifier: string
    password?: string
}

export interface RegisterResponse {
    user_id: string
}

export interface OtpVerifyRequest {
    userId: string;
    otpCode: string;
    purpose: OtpPurpose;
    deviceId?: string;
}

export type OtpPurpose = "login_phone" | "login_email" | "reset_password" | "register_email" | "register_phone";

export interface OtpVerifyResponse {
    access_token: string
}

export interface CompleteRegistrationRequest {
    fullName: string;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    deviceId: string;
    imageType: "default" | "uploaded";
    imageId?: string
    profileImage?: {
        uri: string;
        type: string;
        name: string;
    }
}

export interface CompleteRegistrationResponse {

}