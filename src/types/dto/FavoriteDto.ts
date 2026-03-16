import type { RecipeDto } from './RecipeDto'

export interface FavoriteDto {
  id: number
  documentId: string
  originalRecipeId: number
  recipe: RecipeDto
}
