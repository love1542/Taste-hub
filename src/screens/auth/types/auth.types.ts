
export interface SignupForm {
  email: string;
  password: string;
  phone: string;
  otp: string;
}

export interface EmailStepForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OtpForm {
  otp: string
}

export type StepHandle<T> = {
  validate: () => Promise<T | null>
}

export type SignUpType = 'email' | 'phone' | 'social'