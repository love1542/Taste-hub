import { ImageSourcePropType } from "react-native";

export interface SignupForm {
  email: string;
  password: string;
  phone: string;
  image?: string | ImageSourcePropType
  fullName: string
  dateOfBirth: string
  gender: string
  location: string
}

export interface EmailStepForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OtpForm {
  otp: string
}

export interface phoneForm {
  phone: string
}

export interface profileStepForm {
  image?: string | ImageSourcePropType
  fullName: string
  dateOfBirth: string
  gender: string
  location: string
}

export type StepHandle<T> = {
  validate: () => Promise<T | null>
}

export type SignUpType = 'email' | 'phone' | 'social'

export interface EmailLoginForm {
  email: string;
  password: string;
}
