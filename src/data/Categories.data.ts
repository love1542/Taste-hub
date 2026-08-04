import { Category } from "./types";

export const CATEGORY = {
  PIZZA: 'pizza',
  BURGER: 'burger',
  BIRYANI: 'biryani',
  PASTA: 'pasta',
  SANDWICH: 'sandwich',
  WRAPS: 'wraps',
  FRIES: 'fries',
  DRINKS: 'drinks',
  COFFEE: 'coffee',
  DESSERT: 'dessert',
  SALAD: 'salad',
  NOODLES: 'noodles',
} as const;


export const FOOD_CATEGORIES: Category[] = [
  {
    id: CATEGORY.PIZZA,
    name: 'Pizza',
    image:
      'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
  },
  {
    id: CATEGORY.BURGER,
    name: 'Burger',
    image:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
  },
  {
    id: CATEGORY.PASTA,
    name: 'Pasta',
    image:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
  },
  {
    id: CATEGORY.DRINKS,
    name: 'Drinks',
    image:
      'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg',
  },
  {
    id: CATEGORY.DESSERT,
    name: 'Dessert',
    image:
      'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
  },
  {
    id: CATEGORY.SALAD,
    name: 'Salad',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
  },
  {
    id: CATEGORY.SANDWICH,
    name: 'Sandwich',
    image:
      'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg',
  },
  {
    id: CATEGORY.BIRYANI,
    name: 'Biryani',
    image:
      'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg',
  },
];