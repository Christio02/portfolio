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

export interface ProjectsProps {
	title: string;
	description: string;
	tags: string[];
	featured: boolean;
	status: string;
}
