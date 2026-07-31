import { Cuisine } from "./types";

export const CUISINE = {
  INDIAN: 'indian',
  CHINESE: 'chinese',
  ITALIAN: 'italian',
  MEXICAN: 'mexican',
  THAI: 'thai',
  AMERICAN: 'american',
  JAPANESE: 'japanese',
} as const;

export const cuisines: Cuisine[] = [
  {
    id: CUISINE.INDIAN,
    name: 'Indian',
    image: 'https://placehold.co/200x200',
  },
  {
    id: CUISINE.CHINESE,
    name: 'Chinese',
    image: 'https://placehold.co/200x200',
  },
  {
    id: CUISINE.ITALIAN,
    name: 'Italian',
    image: 'https://placehold.co/200x200',
  },
  {
    id: CUISINE.MEXICAN,
    name: 'Mexican',
    image: 'https://placehold.co/200x200',
  },
  {
    id: CUISINE.THAI,
    name: 'Thai',
    image: 'https://placehold.co/200x200',
  },
  {
    id: CUISINE.AMERICAN,
    name: 'American',
    image: 'https://placehold.co/200x200',
  },
  {
    id: CUISINE.JAPANESE,
    name: 'Japanese',
    image: 'https://placehold.co/200x200',
  },
];