export const parseSearchParams = (params: {
  [key: string]: string | string[] | undefined;
}) => ({
  page: Number(params.page) || 1,
  search: (params.search as string) || "",
  categories: (params.categories as string)?.split(",").filter(Boolean) || [],
});
