import { makeAutoObservable, runInAction } from "mobx";
import { RecipeApi } from "@/api/recipe";
import type { Recipe } from "@/types/models/Recipe";
import type { ILocalStore } from "@/shared/hooks/useLocalStore";
import type { Option } from "@/components/server/MultiDropdown";

type PrivateFields =
  | "_recipes"
  | "_currentPage"
  | "_totalPages"
  | "_searchQuery"
  | "_isLoading"
  | "_selectedOptions";

export class RecipeStore implements ILocalStore {
  private _recipes: Recipe[] = [];
  private _currentPage = 1;
  private _totalPages = 1;
  private _searchQuery = "";
  private _selectedOptions: Option[] = [];
  private _isLoading = false;

  constructor() {
    makeAutoObservable<RecipeStore, PrivateFields>(this);
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  get selectedOptions(): Option[] {
    return this._selectedOptions;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
  }
  setSearchQuery(query: string) {
    if (this._searchQuery !== query) {
      this._searchQuery = query;
      this._currentPage = 1;
    }
  }

  setSelectedOptions(options: Option[]) {
    const currentKeys = this._selectedOptions.map((o) => o.key).join(",");
    const newKeys = options.map((o) => o.key).join(",");

    if (currentKeys !== newKeys) {
      this._currentPage = 1;
    }
    this._selectedOptions = options;
  }

  setCurrentPage(page: number) {
    this._currentPage = page;
  }

  async fetchRecipes() {
    this._isLoading = true;
    try {
      const response = await RecipeApi.getRecipes(
        this._currentPage,
        this._searchQuery,
        this._selectedOptions.map((o) => o.key),
      );
      runInAction(() => {
        this._recipes = response.data;
        this._totalPages = response.meta.pagination.pageCount;
        this._isLoading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  destroy(): void {
    this._recipes = [];
  }
}
