import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		techStack: z.array(z.string()),
		projectLink: z.string().url().optional(),
		githubLink: z.string().url().optional(),
		imageUrl: z.string().optional(),
		featured: z.boolean().default(false),
		publishDate: z.date(),
		status: z.enum(['completed', 'in-progress', 'planned']).default('completed')
	})
});

const pagesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lastUpdated: z.date()
	})
});

export const collections = {
	projects: projectsCollection,
	pages: pagesCollection
};
