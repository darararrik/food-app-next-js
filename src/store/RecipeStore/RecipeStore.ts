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
  | "_selectedOptions"
  | "_rating"
  | "_totalTime"
  | "_cookingTime"
  | "_preparationTime"
  | "_vegetarian";

export class RecipeStore implements ILocalStore {
  private _recipes: Recipe[] = [];
  private _currentPage = 1;
  private _totalPages = 1;
  private _searchQuery = "";
  private _selectedOptions: Option[] = [];
  private _isLoading = false;
  private _rating: number | null = null;
  private _totalTime: number | null = null;
  private _cookingTime: number | null = null;
  private _preparationTime: number | null = null;
  private _vegetarian: boolean | null = null;

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

  get rating(): number | null {
    return this._rating;
  }

  get totalTime(): number | null {
    return this._totalTime;
  }

  get cookingTime(): number | null {
    return this._cookingTime;
  }

  get preparationTime(): number | null {
    return this._preparationTime;
  }

  get vegetarian(): boolean | null {
    return this._vegetarian;
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

  setRating(rating: number | null) {
    if (this._rating !== rating) {
      this._rating = rating;
      this._currentPage = 1;
    }
  }

  setTotalTime(time: number | null) {
    if (this._totalTime !== time) {
      this._totalTime = time;
      this._currentPage = 1;
    }
  }

  setCookingTime(time: number | null) {
    if (this._cookingTime !== time) {
      this._cookingTime = time;
      this._currentPage = 1;
    }
  }

  setPreparationTime(time: number | null) {
    if (this._preparationTime !== time) {
      this._preparationTime = time;
      this._currentPage = 1;
    }
  }

  setVegetarian(isVeg: boolean | null) {
    if (this._vegetarian !== isVeg) {
      this._vegetarian = isVeg;
      this._currentPage = 1;
    }
  }

  async fetchRecipes() {
    this._isLoading = true;
    try {
      const response = await RecipeApi.getRecipes(
        this._currentPage,
        this._searchQuery,
        this._selectedOptions.map((o) => o.key),
        {
          rating: this._rating,
          totalTime: this._totalTime,
          cookingTime: this._cookingTime,
          preparationTime: this._preparationTime,
          vegetarian: this._vegetarian,
        }
      );
      runInAction(() => {
        this._recipes = response.data;
        this._totalPages = response.meta.pagination.pageCount;
        this._isLoading = false;
      });
    } catch {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  destroy(): void {
    this._recipes = [];
  }
}
