export const QUERY_KEYS = {
    defaultImages: ["defaultImages"] as const,
    allAddress: ["allAddress"] as const,
    profile: (userID: string) => ["Profile", userID] as const
};