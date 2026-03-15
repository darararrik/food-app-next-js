"use client";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { RecipeStore } from "@/store/RecipeStore/RecipeStore";
import type { Option } from "@/components/server/MultiDropdown";

export const useRecipesSearchParams = (
  store: RecipeStore,
  categories: Option[],
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lastParamsStr = useRef<string | null>(null);

  useEffect(() => {
    const currentParamsStr = searchParams.toString();
    const query = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const categoriesParams = searchParams.get("categories");
    const ratingParam = searchParams.get("rating");
    const totalTimeParam = searchParams.get("totalTime");
    const cookingTimeParam = searchParams.get("cookingTime");
    const preparationTimeParam = searchParams.get("preparationTime");
    const vegetarianParam = searchParams.get("vegetarian");

    store.setSearchQuery(query);
    store.setCurrentPage(page);
    store.setRating(ratingParam ? Number(ratingParam) : null);
    store.setTotalTime(totalTimeParam ? Number(totalTimeParam) : null);
    store.setCookingTime(cookingTimeParam ? Number(cookingTimeParam) : null);
    store.setPreparationTime(
      preparationTimeParam ? Number(preparationTimeParam) : null,
    );
    store.setVegetarian(
      vegetarianParam !== null ? vegetarianParam === "true" : null,
    );

    if (!categoriesParams) {
      store.setSelectedOptions([]);
    } else if (categories.length > 0) {
      const selectedCategories = categoriesParams
        .split(",")
        .filter(Boolean)
        .map((key: string) => {
          const trimmedKey = key.trim();
          const cat = categories.find((c) => c.key === trimmedKey);
          return { key: trimmedKey, value: cat ? cat.value : trimmedKey };
        });
      store.setSelectedOptions(selectedCategories);
    }

    if (currentParamsStr !== lastParamsStr.current) {
      store.fetchRecipes();
      lastParamsStr.current = currentParamsStr;
    }
  }, [searchParams, categories, store]);

  const updateQueryParams = (params: {
    search?: string;
    page?: number;
    categories?: Option[];
    rating?: number | null;
    totalTime?: number | null;
    cookingTime?: number | null;
    preparationTime?: number | null;
    vegetarian?: boolean | null;
  }) => {
    const newParams = new URLSearchParams(searchParams);

    if (params.search !== undefined) {
      if (params.search) newParams.set("search", params.search);
      else newParams.delete("search");
      newParams.set("page", "1");
    }

    if (params.page !== undefined) {
      newParams.set("page", params.page.toString());
    }

    if (params.categories !== undefined) {
      if (params.categories.length > 0) {
        newParams.set(
          "categories",
          params.categories.map((o) => o.key).join(","),
        );
      } else {
        newParams.delete("categories");
      }
      newParams.set("page", "1");
    }

    if (params.rating !== undefined) {
      if (params.rating !== null)
        newParams.set("rating", params.rating.toString());
      else newParams.delete("rating");
      newParams.set("page", "1");
    }

    if (params.totalTime !== undefined) {
      if (params.totalTime !== null)
        newParams.set("totalTime", params.totalTime.toString());
      else newParams.delete("totalTime");
      newParams.set("page", "1");
    }

    if (params.cookingTime !== undefined) {
      if (params.cookingTime !== null)
        newParams.set("cookingTime", params.cookingTime.toString());
      else newParams.delete("cookingTime");
      newParams.set("page", "1");
    }

    if (params.preparationTime !== undefined) {
      if (params.preparationTime !== null)
        newParams.set("preparationTime", params.preparationTime.toString());
      else newParams.delete("preparationTime");
      newParams.set("page", "1");
    }

    if (params.vegetarian !== undefined) {
      if (params.vegetarian !== null)
        newParams.set("vegetarian", params.vegetarian ? "true" : "false");
      else newParams.delete("vegetarian");
      newParams.set("page", "1");
    }

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return { updateQueryParams };
};
