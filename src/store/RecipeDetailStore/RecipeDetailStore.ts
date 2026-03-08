import { makeAutoObservable, runInAction } from 'mobx'
import { RecipeApi } from '@/api/recipe'
import type { Recipe } from '@/types/models/Recipe'
import type { ILocalStore } from '@/shared/hooks/useLocalStore'

type PrivateFields = '_recipe' | '_isLoading'

export class RecipeDetailStore implements ILocalStore {
  private _recipe: Recipe | null = null
  private _isLoading = false

  constructor() {
    makeAutoObservable<RecipeDetailStore, PrivateFields>(this)
  }

  get recipe(): Recipe | null {
    return this._recipe
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  async fetchRecipe(id: string) {
    this._isLoading = true
    try {
      const recipe = await RecipeApi.getRecipeById(id)
      runInAction(() => {
        this._recipe = recipe
        this._isLoading = false
      })
    } catch (error) {
      runInAction(() => {
        this._isLoading = false
      })
    }
  }

  destroy(): void {
    this._recipe = null
  }
}
