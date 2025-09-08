import exoWorldsImage from '../assets/images/exo-worlds.png';
import flappyImage from '../assets/images/flappy.png';
import ompaProjectImage from '../assets/images/ompa_project_image.png';
import placeholder from '../assets/images/placeholder.webp';

export const projectImages = {
	'ompa_project_image.png': ompaProjectImage,
	'flappy.png': flappyImage,
	'exo-worlds.png': exoWorldsImage,
	'placeholder.webp': placeholder
} as const;

export type ImageKey = keyof typeof projectImages;

export function getProjectImage(imageName: string | undefined | null) {
	// return placeholder
	if (imageName && imageName in projectImages) {
		return projectImages[imageName as ImageKey];
	}

	return placeholder;
}
