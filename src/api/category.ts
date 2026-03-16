import type { StrapiResponse } from "@/types/StrapiResponse";
import { toModel, type CategoryDto } from "@/types/dto/CategoryDto";
import { httpClient } from "./httpClient";

export const CategoryApi = {
  getCategories: async () => {
    const response = await httpClient.get<StrapiResponse<CategoryDto[]>>(
      "/meal-categories",
      {
        params: {
          populate: "*",
        },
      },
    );
    return response.data.map((r) => toModel(r));
  },
};
