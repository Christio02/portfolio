import ompaProjectImage from '../assets/images/ompa_project_image.png';
import placeholder from '../assets/images/placeholder.webp';
// ... import other project images

export const projectImages = {
	'ompa_project_image.png': ompaProjectImage,
	'placeholder.webp': placeholder
	// ... add other image key-value pairs here
} as const;

export type ImageKey = keyof typeof projectImages;

export function getProjectImage(imageName: string | undefined | null) {
	// return placeholder
	if (imageName && imageName in projectImages) {
		return projectImages[imageName as ImageKey];
	}

	console.warn(`Image "${imageName}" not found. Falling back to placeholder.`);
	return placeholder;
}
