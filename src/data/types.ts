// ===========================
// Category
// ===========================

import { CUISINE } from "./cuisines.data";

export const CATEGORY = {
  PIZZA: 'pizza',
  BURGER: 'burger',
  PASTA: 'pasta',
  DRINKS: 'drinks',
  DESSERT: 'dessert',
  SALAD: 'salad',
  SANDWICH: 'sandwich',
  BIRYANI: 'biryani',
} as const;

export type CategoryId = (typeof CATEGORY)[keyof typeof CATEGORY];

export interface Category {
  id: CategoryId;
  name: string;
  image: string;
}

// ===========================
// Cuisine
// ===========================

export type CuisineId = (typeof CUISINE)[keyof typeof CUISINE];

export interface Cuisine {
  id: CuisineId;
  name: string;
  image: string;
}

// ===========================
// Food
// ===========================

export const FOOD_TYPE = {
  VEG: 'veg',
  NON_VEG: 'nonVeg',
} as const;

export type FoodType = (typeof FOOD_TYPE)[keyof typeof FOOD_TYPE];

export interface Food {
  id: string;

  restaurantId: string;
  categoryId: CategoryId;

  name: string;
  description: string;

  image: string;

  price: number;
  discountPrice?: number;

  preparationTime: number; // Minutes

  foodType: FoodType;

  isAvailable: boolean;
}

// ===========================
// Restaurant
// ===========================

export interface Restaurant {
  id: string;

  name: string;
  description: string;

  logo: string;
  coverImage: string;

  address: string;

  location: {
    latitude: number;
    longitude: number;
  };

  cuisineIds: CuisineId[];

  rating: number;

  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: string;

  isOpen: boolean;
  isFavourite: boolean;
}