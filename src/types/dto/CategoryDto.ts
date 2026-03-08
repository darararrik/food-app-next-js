import { Category } from "../models/Category";

export interface CategoryDto {
  id: number;
  documentId: string;
  title: string;
}

export const toModel = (dto: CategoryDto): Category => {
  return {
    id: dto.id,
    documentId: dto.documentId,
    title: dto.title,
  };
};
