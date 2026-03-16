import { toModel as toModelImage, ImageDto } from "./ImageDto";
import type { IngredientDto } from "./IngredientDto";
import type { EquipmentDto } from "./EquipmentDto";
import type { DirectionDto } from "./DirectionDto";
import type { Recipe } from "../models/Recipe";

export interface RecipeDto {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  images: ImageDto[];
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  rating: number;
  calories: number;
  likes: number;
  ingradients: IngredientDto[];
  equipments: EquipmentDto[];
  directions: DirectionDto[];
}
export const toModel = (dto: RecipeDto): Recipe => ({
  id: dto.id,
  documentId: dto.documentId,
  name: dto.name,
  summary: dto.summary,
  images: dto.images?.map((image) => toModelImage(image)) ?? [],
  totalTime: dto.totalTime,
  cookingTime: dto.cookingTime,
  preparationTime: dto.preparationTime,
  servings: dto.servings,
  rating: dto.rating,
  calories: dto.calories,
  likes: dto.likes,
  ingredients: dto.ingradients?.map((ingredient) => ({ ...ingredient })) ?? [],
  equipments: dto.equipments?.map((equipment) => ({ ...equipment })) ?? [],
  directions: dto.directions?.map((direction) => ({ ...direction })) ?? [],
});
