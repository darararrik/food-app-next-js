"use client";

import { useRootStore } from "@/store/RootStoreProvider";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const AuthGuard = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { userStore } = useRootStore();
    const router = useRouter();

    useEffect(() => {
      if (!userStore.isAuthenticated) {
        router.replace("/");
      }
    }, [userStore.isAuthenticated, router]);

    if (!userStore.isAuthenticated) {
      return null;
    }

    return <>{children}</>;
  },
);
