import type { Recipe } from "@/types/models/Recipe";
import TimerIcon from "@/components/server/icons/TimerIcon";
import React from "react";
import Card from "../Card";
import Link from "next/link";

import { FavoriteButton } from "../../../client/Buttons/FavoriteButton";

export type RecipeCardProps = {
  recipe: Recipe;
  isFavorite?: boolean;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const formats = recipe.images?.[0]?.formats;
  const imageUrl =
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.large?.url ||
    formats?.thumbnail?.url ||
    "";

  return (
    <Link href={`/recipes/${recipe.documentId}`}>
      <Card
        title={recipe.name}
        subtitle={recipe.ingredients?.map((i) => i.name).join(" + ") || ""}
        image={imageUrl}
        captionSlot={
          <React.Fragment>
            <TimerIcon />
            {`${recipe.cookingTime} minutes`}
          </React.Fragment>
        }
        actionSlot={<FavoriteButton recipeId={recipe.documentId} />}
        contentSlot={`${recipe.calories} kcal`}
      />
    </Link>
  );
};
export default RecipeCard;
