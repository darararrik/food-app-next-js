"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/RootStoreProvider";
import RecipeCard from "@/components/server/Cards/RecipeCard/RecipeCard";
import Text from "@/components/server/Text";
import styles from "./FavoritesPage.module.scss";
import { AuthGuard } from "@/components/client/AuthGuard/AuthGuard";
import React from "react";

const FavoritesPageContent = observer(() => {
  const { favoriteStore } = useRootStore();

  useEffect(() => {
    favoriteStore.fetchFavorites();
  }, [favoriteStore]);

  if (
    favoriteStore.favorites === undefined ||
    favoriteStore.favorites.length === 0
  ) {
    if (favoriteStore.isLoading) {
      return (
        <div className={styles.loading}>
          <Text view="title">Loading...</Text>
        </div>
      );
    }
    return (
      <div className={styles.empty}>
        <Text view="title">No favorites yet</Text>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <Text view="title" className={styles.title}>
        Favorites
      </Text>
      <section className={styles.recipesSection}>
        {favoriteStore.favorites.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </div>
  );
});

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <FavoritesPageContent />
    </AuthGuard>
  );
}
