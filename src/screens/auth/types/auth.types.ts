import { PickedImage } from "../../../components/imagePicker/types/imagePicker.types";

export interface SignupForm {
  id: string
  email?: string;
  password?: string;
  phone?: string;
  image?: PickedImage
  fullName: string
  dateOfBirth: string
  gender: string
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
  image?: PickedImage
  fullName: string
  dateOfBirth: string
  gender: string
}

export type StepHandle<T> = {
  validate: () => Promise<T | null>
}

export type SignUpType = 'cardentials' | 'social'

export interface EmailLoginForm {
  email: string;
  password: string;
}

export type phoneformOtp = {
  phone: string
  otp: string
}

export type loginUserStorage = {
  token: string;
  userId: string;
}