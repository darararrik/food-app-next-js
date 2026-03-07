import { makeAutoObservable, runInAction } from "mobx";
import { CategoryApi } from "@/api/category";
import type { Option } from "@/components/server/MultiDropdown";

type PrivateFields = "_categories" | "_isLoaded" | "_isLoading";

export class CategoryStore {
  private _categories: Option[] = [];
  private _isLoaded = false;
  private _isLoading = false;

  constructor() {
    makeAutoObservable<CategoryStore, PrivateFields>(this);
  }

  get categories(): Option[] {
    return this._categories;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  async fetchCategories() {
    if (this._isLoaded) return;

    this._isLoading = true;
    try {
      const response = await CategoryApi.getCategories();
      runInAction(() => {
        this._categories = response.map((cat) => ({
          key: cat.id.toString(),
          value: cat.title,
        }));
        this._isLoaded = true;
        this._isLoading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}
