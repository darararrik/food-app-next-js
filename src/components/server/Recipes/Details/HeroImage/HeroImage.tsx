import type { Recipe } from "@/types/models/Recipe";
import InfoText from "../InfoText/InfoText";
import styles from "./HeroImage.module.scss";
import React from "react";
import Image from "next/image";
type HeroImageProps = {
  recipe: Recipe;
};

const HeroImage: React.FC<HeroImageProps> = ({ recipe }) => {
  const recipeImage =
    recipe.images[0]?.formats?.large?.url ||
    recipe.images[0]?.formats?.medium?.url;

  return (
    <div className={styles.imageContainer}>
      <Image
        src={recipeImage || ""}
        alt={recipe.name}
        className={styles.heroImage}
        width={448}
        height={448}
      />
      <div className={styles.infoContainer}>
        <InfoText
          title="Preparation"
          data={`${recipe.preparationTime} minutes`}
        />
        <InfoText title="Cooking" data={`${recipe.cookingTime} minutes`} />
        <InfoText title="Total" data={`${recipe.totalTime} minutes`} />
        <InfoText title="Likes" data={recipe.likes.toString()} />
        <InfoText title="Servings" data={`${recipe.servings} servings`} />
        <InfoText title="Rating" data={`${recipe.rating} / 5`} />
      </div>
    </div>
  );
};

export default HeroImage;
