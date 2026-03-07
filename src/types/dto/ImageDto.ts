import { Image } from "../models/Image";

export interface ImageDto {
  name: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}
export const toModel = (dto: ImageDto): Image => {
  return {
    name: dto.name,
    formats: dto.formats,
  };
};
