export interface ProfileResponse {
    userId: string;
    email: string | null;
    phone: string | null;
    fullName: string;
    imageUrl: string | null;
    gender: string ;
    dateOfBirth: string;
    emailVerified: boolean;
    phoneVerified: boolean;
}