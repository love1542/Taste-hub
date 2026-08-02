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
    image: 'https://hips.hearstapps.com/hmg-prod/images/delish-191119-butter-chicken-0367-portrait-pf-1574729678.jpg?crop=0.692xw:0.693xh;0.142xw,0.101xh',
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