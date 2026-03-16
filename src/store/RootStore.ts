import { UserStore } from "./UserStore/UserStore";
import { FavoriteStore } from "./FavoriteStore/FavoriteStore";
import { RecipeStore } from "./RecipeStore/RecipeStore";
import { CategoryStore } from "./CategoryStore/CategoryStore";

export class RootStore {
  userStore: UserStore;
  favoriteStore: FavoriteStore;
  recipesStore: RecipeStore;
  categoryStore: CategoryStore;

  constructor() {
    this.userStore = new UserStore();
    this.favoriteStore = new FavoriteStore(this.userStore);
    this.recipesStore = new RecipeStore();
    this.categoryStore = new CategoryStore();
  }
}
