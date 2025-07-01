import ompaProjectImage from '../assets/images/ompa_project_image.png';
import placeholder from '../assets/images/placeholder.webp';
// import other images

export const projectImages = {
	'ompa_project_image.png': ompaProjectImage,
	'placeholder.webp': placeholder
	// add other images
} as const;

export type ImageKey = keyof typeof projectImages;

export function getProjectImage(imageName: string): ImageMetadata {
	return projectImages[imageName as ImageKey] || placeholder;
}
