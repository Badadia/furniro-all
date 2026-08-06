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
