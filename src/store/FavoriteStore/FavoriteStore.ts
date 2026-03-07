import { makeAutoObservable, runInAction } from "mobx";
import { RecipeApi } from "@/api/recipe";
import type { Recipe } from "@/types/models/Recipe";
import type { UserStore } from "@/store/UserStore/UserStore";

type PrivateFields = "_favorites" | "_isLoading" | "_showLoginModal";

export class FavoriteStore {
  private _favorites: Recipe[] = [];
  private _isLoading = false;
  private _showLoginModal = false;
  private readonly _userStore: UserStore;

  constructor(userStore: UserStore) {
    makeAutoObservable<FavoriteStore, PrivateFields>(this);
    this._userStore = userStore;
  }

  get favorites(): Recipe[] {
    return this._favorites;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get showLoginModal(): boolean {
    return this._showLoginModal;
  }

  get isFavorite() {
    return (recipeId: string) =>
      this._favorites.some((fav) => fav.documentId === recipeId);
  }

  setShowLoginModal(value: boolean) {
    this._showLoginModal = value;
  }

  async fetchFavorites() {
    this._isLoading = true;
    try {
      const recipes = await RecipeApi.getFavoriteRecipes();
      runInAction(() => {
        this._favorites = recipes;
        this._isLoading = false;
      });
    } catch (error) {
      console.error(error);
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

    const isFavorite = this._favorites.some(
      (fav) => fav.documentId === recipeId,
    );
    try {
      if (isFavorite) {
        await RecipeApi.deleteRecipe(recipeId);
        runInAction(() => {
          this._favorites = this._favorites.filter(
            (fav) => fav.documentId !== recipeId,
          );
        });
      } else {
        await RecipeApi.saveRecipe(recipeId);
        const recipe = await RecipeApi.getRecipeById(recipeId);
        runInAction(() => {
          this._favorites.push(recipe);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
