export const QUERY_KEYS = {
    defaultImages: ["defaultImages"] as const,
    allAddress: ["allAddress"] as const,
    profile: (userID: string) => ["Profile", userID] as const,
    allRestaurants: (params: { limit: number; search?: string; sortBy?: string; sortOrder?: 'ASC' | 'DESC' }) =>
        ["all_Restaurants", params.limit, params.search, params.sortBy, params.sortOrder] as const,
};