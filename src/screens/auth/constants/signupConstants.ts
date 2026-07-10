import { SignUpType } from "../types/auth.types";

export enum SignupStep {
  Credential = "credential",
  Verification = "verification",
  UserInfo = "userInfo",
}

export const SIGNUP_SCREENS: Record<SignUpType, readonly SignupStep[]> = {
  email: [
    SignupStep.Credential,
    SignupStep.Verification,
    SignupStep.UserInfo,
  ],
  phone: [
    SignupStep.Credential,
    SignupStep.Verification,
    SignupStep.UserInfo,
  ],
  social: [
    SignupStep.UserInfo,
  ],
} as const;