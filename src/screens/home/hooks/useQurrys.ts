import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { GetRestaurantsRequestParam } from "../../../api/dto/restaurants.dto"
import { restaurantManager } from "../../../api/managers/restaurantManager"
import { QUERY_KEYS } from "../../../constants/appConstants/qurryKeys"
import { getLocationsWithQuery } from "../../../services/locationService"

export const useGetRestaurants = ({ limit, search, sortBy, sortOrder }: Omit<GetRestaurantsRequestParam, "page">) => {
    return useInfiniteQuery({
    queryKey: QUERY_KEYS.allRestaurants({ limit, search, sortBy, sortOrder }),
     initialPageParam: 1,
     queryFn: ({ pageParam }) => restaurantManager.getRestaurants({ page: pageParam, limit, search, sortBy, sortOrder }),
     getNextPageParam: lastPage => {
       const pagination = lastPage.data.pagination
       return pagination.hasNextPage ? pagination.nextPage ?? pagination.currentPage + 1 : undefined
     },
    })
}

export const useGetLocations = (query: string) => {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ['search_Locations', trimmedQuery],
    queryFn: () => getLocationsWithQuery(trimmedQuery),
    enabled: trimmedQuery.length >= 3,
  });
};