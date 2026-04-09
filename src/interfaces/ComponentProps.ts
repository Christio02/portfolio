import type { EducationProps, ExperiencesProps } from "@/interfaces/DataProps";
export interface SectionLabelProps {
	index: string;
	label: string;
}

export interface AboutProps {
	experiences: ExperiencesProps[];
	education: EducationProps[];
}

export interface FadeInViewProps {
	children: React.ReactNode;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
	className?: string;
	style?: React.CSSProperties;
}
