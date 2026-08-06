export const CATEGORIES = ["Dining", "Living", "Bedroom"];

export const CATEGORIES_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  ...CATEGORIES.map((category) => ({
    label: category,
    value: category.toLowerCase(),
  })),
];

export const SORT_OPTIONS = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Price: Low to High",
    value: "price_asc",
  },
  {
    label: "Price: High to Low",
    value: "price_desc",
  },
];
