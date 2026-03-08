"use client";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/RootStoreProvider";
import { RecipeList } from "./RecipeList";
import { useEffect } from "react";
import { Recipe } from "@/types/models/Recipe";

type ListWrapperProps = {
  isFav?: boolean;
  initialRecipes?: Recipe[];
};

export const ListWrapper = observer(
  ({ isFav = false, initialRecipes }: ListWrapperProps) => {
    const { recipesStore, favoriteStore } = useRootStore();

    const currentStore = isFav ? favoriteStore : recipesStore;
    useEffect(() => {
      if (initialRecipes) {
        currentStore.setRecipes(initialRecipes);
      } else {
        currentStore.fetchRecipes();
      }
    }, [initialRecipes]);
    return (
      <RecipeList
        recipes={currentStore.recipes}
        isLoading={currentStore.isLoading}
      />
    );
  },
);
