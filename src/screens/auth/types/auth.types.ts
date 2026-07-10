
export interface SignupForm {
  email: string;
  password: string;
  phone: string;
  otp: string;
}

export type SignUpType = 'email' | 'phone' | 'social'