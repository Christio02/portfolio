import type { EducationProps, ExperiencesProps } from "@/interfaces/DataProps";
export interface SectionLabelProps {
	index: string;
	label: string;
}

export interface AboutProps {
	experiences: ExperiencesProps[];
	education: EducationProps[];
}
