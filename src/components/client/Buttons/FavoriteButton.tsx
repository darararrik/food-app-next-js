"use client";

import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/RootStoreProvider";
import Button from "@/components/server/Button";
import React from "react";

type FavoriteButtonProps = {
  recipeId: string;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = observer(
  ({ recipeId }) => {
    const { favoriteStore } = useRootStore();
    const isFav = favoriteStore.isFavorite(recipeId);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        await favoriteStore.toggleFavorite(recipeId);
      } finally {
      }
    };

    return (
      <Button onClick={handleFavoriteClick}>{isFav ? "Remove" : "Save"}</Button>
    );
  },
);
