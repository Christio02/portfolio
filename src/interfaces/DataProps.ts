import type { LucideIcon } from "lucide-react";

export interface ExperiencesProps {
	role: string;
	company: string;
	period: string;
	bullets: string[];
}

export interface EducationProps {
	degree: string;
	institution: string;
	period: string;
	bullets: string[];
}

export interface SkillGroupsProps {
	category: string;
	items: string[];
	icon: LucideIcon;
	accent: string;
}

export interface ProjectProps {
	title: string;
	description: string;
	tags: string[];
	featured: boolean;
	status: "STABLE" | "PRODUCTION" | "EXPERIMENTAL";
	index: number;
	githubUrl?: string;
	collaborators?: Collaborator[];
}

interface Collaborator {
	name: string;
	linkedInUrl?: string;
	githubUrl?: string;
}

export interface SocialLinksProps {
	name: string;
	url: string;
}
