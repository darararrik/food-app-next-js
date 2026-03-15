import { toModel, type RecipeDto } from "@/types/dto/RecipeDto";
import type { FavoriteDto } from "@/types/dto/FavoriteDto";
import type { StrapiResponse } from "@/types/StrapiResponse";
import type { Recipe } from "@/types/models/Recipe";
import { httpClient } from "./httpClient";

type RecipeParams = {
  populate: string[];
  pagination?: { page: number; pageSize: number };
  filters?: Record<string, unknown>;
};

type FavoriteResponse = {
  data: { id: number; documentId: string };
};

export const RecipeApi = {
  getRecipes: async (
    page = 1,
    search = "",
    categories: string[] = [],
    additionalFilters: {
      rating?: number | null;
      totalTime?: number | null;
      cookingTime?: number | null;
      preparationTime?: number | null;
      vegetarian?: boolean | null;
    } = {}
  ): Promise<StrapiResponse<Recipe[]>> => {
    const params: RecipeParams = {
      populate: ["images", "ingradients", "category"],
      pagination: {
        page,
        pageSize: 12,
      },
    };

    if (search) {
      params.filters = {
        ...params.filters,
        name: {
          $containsi: search,
        },
      };
    }

    if (categories.length > 0) {
      params.filters = {
        ...params.filters,
        category: {
          id: {
            $in: categories.map(Number),
          },
        },
      };
    }

    if (additionalFilters.rating != null) {
      params.filters = {
        ...params.filters,
        rating: {
          $gte: additionalFilters.rating,
        },
      };
    }

    if (additionalFilters.totalTime != null) {
      params.filters = {
        ...params.filters,
        totalTime: {
          $lte: additionalFilters.totalTime,
        },
      };
    }

    if (additionalFilters.cookingTime != null) {
      params.filters = {
        ...params.filters,
        cookingTime: {
          $lte: additionalFilters.cookingTime,
        },
      };
    }

    if (additionalFilters.preparationTime != null) {
      params.filters = {
        ...params.filters,
        preparationTime: {
          $lte: additionalFilters.preparationTime,
        },
      };
    }

    if (additionalFilters.vegetarian != null) {
      params.filters = {
        ...params.filters,
        vegetarian: {
          $eq: additionalFilters.vegetarian,
        },
      };
    }

    const response = await httpClient.get<StrapiResponse<RecipeDto[]>>(
      "/recipes",
      {
        params,
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    );
    return {
      data: response.data.map(toModel),
      meta: response.meta,
    };
  },

  getFavoriteRecipes: async (page = 1): Promise<Recipe[]> => {
    try {
      const res = await httpClient.get<FavoriteDto[]>("/favorites", {
        params: {
          populate: ["recipe"],
          pagination: {
            page,
            pageSize: 12,
          },
        },
        fetchOptions: {
          cache: "no-store",
        },
      });

      const favorites = res;

      if (favorites && favorites.length > 0) {
        const promises = favorites.map(async (fav) => {
          if (fav.recipe?.documentId) {
            const recipeData = await RecipeApi.getRecipeById(
              fav.recipe.documentId,
            );
            return recipeData;
          }
          return null;
        });

        const results = await Promise.all(promises);
        return results.filter((r): r is Recipe => r !== null);
      }

      return [];
    } catch {
      return [];
    }
  },

  getRecipeById: async (documentId: string): Promise<Recipe> => {
    const response = await httpClient.get<{ data: RecipeDto }>(
      `/recipes/${documentId}`,
      {
        params: {
          populate: [
            "ingradients",
            "equipments",
            "directions.image",
            "images",
            "category",
          ],
        },
      },
    );
    return toModel(response.data);
  },

  saveRecipe: async (recipeId: string) => {
    const response = await httpClient.post<FavoriteResponse>("/favorites/add", {
      recipe: recipeId,
    });
    return response.data;
  },

  deleteRecipe: async (recipeId: string) => {
    const response = await httpClient.post<FavoriteResponse>(
      `/favorites/remove`,
      {
        recipe: recipeId,
      },
    );
    return response.data;
  },

  findRecipeByName: async (name: string): Promise<StrapiResponse<Recipe[]>> => {
    const response = await httpClient.get<StrapiResponse<RecipeDto[]>>(
      "/recipes",
      {
        params: {
          populate: [
            "ingradients",
            "equipments",
            "directions.image",
            "images",
            "category",
          ],
          filters: {
            name: {
              $containsi: name,
            },
          },
        },
      },
    );
    return {
      data: response.data.map(toModel),
      meta: response.meta,
    };
  },

  getRandomRecipe: async (): Promise<Recipe | null> => {
    try {
      // First fetch to get the total count
      const initialResponse = await httpClient.get<StrapiResponse<RecipeDto[]>>(
        "/recipes",
        {
          params: {
            pagination: { page: 1, pageSize: 1 },
          },
        }
      );

      const totalCount = initialResponse.meta.pagination.total;
      if (totalCount === 0) return null;

      // Pick a random starting point
      const randomIndex = Math.floor(Math.random() * totalCount);

      const randomResponse = await httpClient.get<StrapiResponse<RecipeDto[]>>(
        "/recipes",
        {
          params: {
            populate: [
              "ingradients",
              "equipments",
              "directions.image",
              "images",
              "category",
            ],
            pagination: { start: randomIndex, limit: 1 },
          },
          fetchOptions: { cache: "no-store" }
        }
      );

      return randomResponse.data.length > 0 ? toModel(randomResponse.data[0]) : null;
    } catch {
      return null;
    }
  },
};
