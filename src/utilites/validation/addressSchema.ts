import z from 'zod'
import { phoneSchema, profileStepSchema } from './authSchema'

const nameSchema = profileStepSchema.shape.fullName

export const addAddressSchema = z.object({
  receiverName: nameSchema,

  receiverPhone: phoneSchema,

  addressLine: z.string()
    .min(3, 'Address is required'),

  area: z.string(),

  landmark: z.string(),

  city: z.string()
    .min(3, 'City is required'),

  state: z.string()
    .min(1, 'State is required'),

  postalCode: z.string()
    .regex(/^\d{6}$/, 'Enter valid 6-digit postal code')
    .or(z.literal('')),
})

export type AddAddressFormSchema = z.infer<typeof addAddressSchema>
