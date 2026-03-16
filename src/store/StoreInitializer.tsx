"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "@/store/RootStoreProvider";

export const StoreInitializer = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { userStore, favoriteStore } = useRootStore();

    useEffect(() => {
      if (userStore.isAuthenticated) {
        favoriteStore.fetchRecipes();
      }
    }, [userStore.isAuthenticated, favoriteStore]);

    return <>{children}</>;
  },
);
