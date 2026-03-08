import { makeAutoObservable, runInAction } from "mobx";
import { RecipeApi } from "@/api/recipe";
import type { Recipe } from "@/types/models/Recipe";
import type { UserStore } from "@/store/UserStore/UserStore";

type PrivateFields = "_recipes" | "_isLoading" | "_showLoginModal";

export class FavoriteStore {
  private _recipes: Recipe[] = [];
  private _isLoading = false;
  private _showLoginModal = false;
  private readonly _userStore: UserStore;

  constructor(userStore: UserStore) {
    makeAutoObservable<FavoriteStore, PrivateFields>(this);
    this._userStore = userStore;
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get showLoginModal(): boolean {
    return this._showLoginModal;
  }

  get isFavorite() {
    return (recipeId: string) =>
      this._recipes.some((fav) => fav.documentId === recipeId);
  }

  setShowLoginModal(value: boolean) {
    this._showLoginModal = value;
  }
  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
  }

  async fetchRecipes() {
    this._isLoading = true;
    try {
      const recipes = await RecipeApi.getFavoriteRecipes();
      runInAction(() => {
        this._recipes = recipes;
        this._isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async toggleFavorite(recipeId: string) {
    if (!this._userStore.isAuthenticated) {
      this._showLoginModal = true;
      return;
    }

    const isFavorite = this._recipes.some((fav) => fav.documentId === recipeId);
    try {
      if (isFavorite) {
        await RecipeApi.deleteRecipe(recipeId);
        runInAction(() => {
          this._recipes = this._recipes.filter(
            (fav) => fav.documentId !== recipeId,
          );
        });
      } else {
        await RecipeApi.saveRecipe(recipeId);
        const recipe = await RecipeApi.getRecipeById(recipeId);
        runInAction(() => {
          this._recipes.push(recipe);
        });
      }
    } catch (error) {
    }
  }
}
