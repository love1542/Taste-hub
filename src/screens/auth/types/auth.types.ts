import { PickedImage } from "../../../components/imagePicker/types/imagePicker.types";

export interface SignupForm {
  email?: string;
  password?: string;
  phone?: string;
  image?: PickedImage
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

export interface profileStepForm {
  image?: PickedImage
  fullName: string
  dateOfBirth: string
  gender: string
  location: string
}

export type StepHandle<T> = {
  validate: () => Promise<T | null>
}

export type SignUpType = 'email' | 'phone' | 'social'