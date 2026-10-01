export type RestaurantModel = {
    restaurantId: string;
    name: string;
    coverImage: string | null;
    deliveryFee: number;
    minimumOrder: number;
    minDeliveryMinutes: number | null;
    maxDeliveryMinutes: number | null;
    isOpen: boolean;
    isFavourite: boolean;
    rating: number;
    ratingCount: number;
    cuisines: Array<{
        id: string;
        name: string;
        }>;
    location: {
        city: string;
        state: string;
        area: string;
    } | null;
};

export type RestaurantPaginationModel = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
};

export type RestaurantsResponse = {
    items: RestaurantModel[];
    pagination: RestaurantPaginationModel;
};

export type GetRestaurantsRequestParam = {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
};
