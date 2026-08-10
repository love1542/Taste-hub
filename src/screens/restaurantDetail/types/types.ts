import { Category, Food } from "../../../data/types";

export interface RestaurantMenu {
    categories: Category[];
    foods: Food[];
}