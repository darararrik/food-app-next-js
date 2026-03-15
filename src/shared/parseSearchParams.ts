export const parseSearchParams = (params: {
  [key: string]: string | string[] | undefined;
}) => ({
  page: Number(params.page) || 1,
  search: (params.search as string) || "",
  categories: (params.categories as string)?.split(",").filter(Boolean) || [],
  rating: params.rating ? Number(params.rating) : null,
  totalTime: params.totalTime ? Number(params.totalTime) : null,
  cookingTime: params.cookingTime ? Number(params.cookingTime) : null,
  preparationTime: params.preparationTime ? Number(params.preparationTime) : null,
  vegetarian: params.vegetarian !== undefined ? params.vegetarian === "true" : null,
});
