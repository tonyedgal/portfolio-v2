import { socialCards } from "@/lib/site-metadata";
import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "Tony Edgal’s open-source projects";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function Image() {
  return createSocialImage(socialCards.projects);
}
