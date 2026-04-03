export interface ExperiencesProps {
	role: string;
	company: string;
	period: string;
	bullets: string[];
}

export interface SkillGroupsProps {
	category: string;
	items: string[];
	icon: string;
	accent: string;
}

export interface ProjectProps {
	title: string;
	description: string;
	tags: string[];
	featured: boolean;
	status: "STABLE" | "PRODUCTION" | "EXPERIMENTAL";
}

export interface SocialLinksProps {
	name: string;
	url: string;
}
