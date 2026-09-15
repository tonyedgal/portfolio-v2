import { socialCards } from "@/lib/site-metadata";
import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "UI-Theme project by Tony Edgal";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function Image() {
  return createSocialImage(socialCards.uiTheme);
}
