"use client";

import Pagination from "@/components/client/Pagination/Pagination";
import { useRecipesSearchParams } from "@/shared/hooks/useRecipesSearchParams";
import { useRootStore } from "@/store/RootStoreProvider";
import { observer } from "mobx-react-lite";

export const PaginationWrapper = observer(
  ({
    totalPages,
    currentPage,
  }: {
    totalPages: number;
    currentPage: number;
  }) => {
    const { recipesStore: store } = useRootStore();
    const { updateQueryParams } = useRecipesSearchParams(store, []);

    const handlePageChange = (page: number) => {
      updateQueryParams({ page });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    );
  },
);
