"use client";

import Search from "./Search";
import { useRecipesSearchParams } from "@/shared/hooks/useRecipesSearchParams";
import { useRootStore } from "@/store/RootStoreProvider";
import { observer } from "mobx-react-lite";
import type { Option } from "@/components/server/MultiDropdown";

export const SearchWrapper = observer(
  ({ initialCategories }: { initialCategories: Option[] }) => {
    const { recipesStore: store } = useRootStore();
    const { updateQueryParams } = useRecipesSearchParams(
      store,
      initialCategories,
    );

    return (
      <Search
        searchValue={store.searchQuery}
        selectedOptions={store.selectedOptions}
        options={initialCategories}
        onSearch={(value) => updateQueryParams({ search: value })}
        onFilter={(options) => updateQueryParams({ categories: options })}
      />
    );
  },
);
