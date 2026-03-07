import React from "react";
import RecipeCard from "@/components/server/Cards/RecipeCard";
import type { Recipe } from "@/types/models/Recipe";
import styles from "./RecipeList.module.scss";

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  if (recipes.length === 0) {
    return <div className={styles.noRecipes}>Recipes not found</div>;
  }

  return (
    <section className={styles.recipesSection}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.documentId} recipe={recipe} />
      ))}
    </section>
  );
};
