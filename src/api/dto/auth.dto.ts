export interface RegisterRequest {
    type: "phone" | "email"
    identifier: string
    password?: string
}

export interface RegisterResponse {
    user_id: string,
    phone: string,
    email: string,
    email_verified: string,
    phone_verified: string,
}