import { RecipeApi } from "@/api/recipe";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Text from "@/components/server/Text";
import styles from "./page.module.scss";
import HeroImage from "@/components/server/Recipes/Details/HeroImage/HeroImage";
import IngredientsAndEquipment from "@/components/server/Recipes/Details/IngredientsAndEquipment/IngredientsAndEquipment";
import Directions from "@/components/server/Recipes/Details/Directions/Directions";
import parse from "html-react-parser";
import BackButton from "./components/BackButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recipe = await RecipeApi.getRecipeById(id);

  if (!recipe) {
    return { title: "Recipe not found" };
  }

  return {
    title: recipe.name,
    description:
      recipe.summary?.substring(0, 160) ||
      `Delicious recipe for ${recipe.name}`,
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;

  let recipe;
  try {
    recipe = await RecipeApi.getRecipeById(id);
  } catch {
    notFound();
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className={styles.main}>
      <section className={styles.heroContent}>
        <div className={styles.header}>
          <BackButton />
          <Text view="title">{recipe.name}</Text>
        </div>
        <HeroImage recipe={recipe} />
      </section>
      <section className={styles.content}>
        <div className={styles.summaryContainer}>
          <Text view="p-16">{recipe.summary ? parse(recipe.summary) : ""}</Text>
        </div>
        <IngredientsAndEquipment recipe={recipe} />
        <Directions direction={recipe.directions} />
      </section>
    </div>
  );
}
