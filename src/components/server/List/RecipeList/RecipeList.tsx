import React from "react";
import RecipeCard from "@/components/server/Cards/RecipeCard";
import RecipeCardSkeleton from "../../Cards/CardSkeleton/RecipeCardSkeleton";
import type { Recipe } from "@/types/models/Recipe";
import styles from "./RecipeList.module.scss";

type RecipeListProps = {
  recipes: Recipe[];
  isLoading: boolean;
};

export const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <section className={styles.recipesSection}>
        {Array.from({ length: 12 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (recipes.length === 0) {
    return <div className={styles.noRecipes}>Recipes not found</div>;
  }

  return (
    <section className={styles.recipesSection}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
};
