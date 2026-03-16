import type { Image } from './Image'
import type { Ingredient } from './Ingredient'
import type { Equipment } from './Equipment'
import type { Direction } from './Direction'

export interface Recipe {
  id: number
  documentId: string
  name: string
  summary: string
  images: Image[]
  totalTime: number
  cookingTime: number
  preparationTime: number
  servings: number
  rating: number
  calories: number
  likes: number
  ingredients: Ingredient[]
  equipments: Equipment[]
  directions: Direction[]
}
