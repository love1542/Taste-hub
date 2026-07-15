import z from "zod";
import { EMAIL_REGEX } from "../../constants/appConstants";

export const phoneSchema = z.object({
    phone: z
        .string()
        .min(10, ('Enter valid number'))
        .max(10,("Enter valid number"))
})

export const emailStepSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .regex(EMAIL_REGEX, "Enter Valid Email"),
        
    password: z.string()
        .min(1, "Password is required")
        .min(6, "Min. 6 digits"),
        
    confirmPassword: z.string()
        .min(1, "Confirm password is required")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});


export const otpSchema = z.object({
    otp: z.string()
    .min(6, ("Fill otp"))
})