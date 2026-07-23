import z from "zod";
import { EMAIL_REGEX } from "../../constants/appConstants";

export const phoneSchema =  z.string()
        .min(10, ('Enter valid number'))
        .max(10,("Enter valid number"))

export const emailSchema =  z.string()
        .min(1, "Email is required")
        .regex(EMAIL_REGEX, "Enter Valid Email")

export const passwordSchema =  z.string()
        .min(1, "Password is required")
        .min(6, "Min. 6 digits")

export const emailStepSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
        .min(1, "Confirm password is required")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});


export const otpSchema = z.string()
    .min(6, ("Fill otp"))

export const profileStepSchema = z.object({
    image: z.any().optional(),

    fullName: z.string()
    .min(3,{message: 'Enter valid name'})
    .min(1,{message: 'Name is Requied'}),

    dateOfBirth: z.string()
        .min(1,{message: 'Date of Birth is required'}),

    gender: z.string()
    .min(1, {message: " Gender is required"}),

    location: z.string()
    .min(1, {message: "location is required"})
})

export const emailLoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const phoneOtpSchema = z.object({
    phone: phoneSchema,
    otp: otpSchema
})