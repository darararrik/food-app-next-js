"use client";

import Text from "@/components/server/Text";
import styles from "./FavoritesPage.module.scss";
import { AuthGuard } from "@/components/client/AuthGuard/AuthGuard";
import { ListWrapper } from "@/components/server/List/RecipeList/ListWrapper";

const FavoritesPageContent = () => {
  return (
    <div className={styles.favoritesPage}>
      <Text view="title" className={styles.title}>
        Favorites
      </Text>
      <ListWrapper isFav />
    </div>
  );
};

export default function FavoritesPageClient() {
  return (
    <AuthGuard>
      <FavoritesPageContent />
    </AuthGuard>
  );
}


