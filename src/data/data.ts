import { BrainCog, Database, Wallpaper, Workflow } from "lucide-react";
import type {
	EducationProps,
	ExperiencesProps,
	ProjectProps,
	SkillGroupsProps,
	SocialLinksProps,
} from "@/interfaces/DataProps";

export const experiences: ExperiencesProps[] = [
	{
		role: "Software Engineer",
		company: "Hoggorm Design A/S",
		period: "2023 – present",
		bullets: [
			"Developing scalable web apps with React, Next.js, TypeScript, and Sanity CMS",
			"Reduced bandwidth usage 80% via image optimization and lazy loading",
			"Implemented secure deployment pipelines and performance monitoring",
		],
	},
	{
		role: "Developer",
		company: "Studentmediene i Trondheim",
		period: "2023 – 2024",
		bullets: [
			"Built dynamic apps with React & TypeScript in an agile team",
			"Shipped a GDPR-compliant privacy consent system (full-stack)",
			"Course review platform with strong user adoption",
		],
	},
];

export const education: EducationProps[] = [
	{
		degree: "M.sc in Computer science",
		institution: "NTNU",
		period: "2025 - Present",
		bullets: [
			"Focus: Math, Physics, Leadership, Distributed systems, Data mining, AI and Machine learning",
			"Developed algorithms for data mining and AI",
			"Switched to an engineering degree to gain experience in math and physics relevant for machine learning and data mining",
		],
	},
	{
		degree: "Bachelor in Informatics",
		institution: "NTNU",
		period: "2022 - 2025",
		bullets: [
			"Focus: Frontend, Backend, Databases, Operating systems and Security",
			"Developed REST APIs in Java/C# and advanced web applications",
			"Bachelor Project with Bouvet focusing on a Online Sheet music website, still working on it part-time",
		],
	},
];

export const skillGroups: SkillGroupsProps[] = [
	{
		category: "frontend",
		items: [
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Framer Motion",
			"TanStack Query",
			"GraphQL",
		],
		icon: Wallpaper,
		accent: "primary",
	},
	{
		category: "backend",
		items: [
			"Node.js",
			"Express",
			"Spring Boot",
			"Kotlin",
			"Java",
			"C# / ASP.NET",
			"REST",
			"GraphQL",
		],
		icon: Database,
		accent: "secondary",
	},
	{
		category: "data_&_ai",
		items: [
			"Python",
			"Data Mining",
			"Machine Learning",
			"SQL",
			"PostgreSQL",
			"MongoDB",
		],
		icon: BrainCog,
		accent: "primary",
	},
	{
		category: "infrastructure",
		items: ["Docker", "Azure", "CI/CD", "Git", "Linux"],
		icon: Workflow,
		accent: "secondary",
	},
];

export const projects: ProjectProps[] = [
	{
		title: "ExoWorlds Explorer",
		description:
			"A full-stack web app for discovering and exploring exoplanets, featuring advanced filtering, habitability scoring, and AI-generated planet imagery.",
		tags: [
			"React",
			"TypeScript",
			"GraphQL",
			"Spring Boot",
			"Kotlin",
			"PostgreSQL",
			"Docker",
		],
		featured: true,
		status: "STABLE",
		index: 1,
		githubUrl: "https://github.com/Christio02/exo-worlds.git",
	},
	{
		title: "Online Sheet Music Management",
		description:
			"My Bachelor project, which I worked on with 6 others. The solution was developed for Heimdal Storband in collaboration with Bouvet ASA. It is a web-based system to simplify how bands manage, organize, and distribute sheet music. Still contributing when I have time, nearly ready for production.",
		tags: [
			"React",
			"TypeScript",
			"C#",
			"ASP.NET Core",
			"PostgreSQL",
			"Azure",
			"Docker",
		],
		featured: true,
		status: "STABLE",
		index: 2,
		githubUrl: "https://github.com/Christio02/bachelor-ompa.git",
	},
	{
		title: "Dungeons and Developers",
		description:
			"Explore D&D mechanics: build characters, browse classes, monsters, races, and ability scores with a full GraphQL backend. Developed with my good friends. We received grade A, the feedback was: The platform is highly user-friendly with an intuitive navigation system and a seamless login process. The professor highlighted the effective implementation of filtering, sorting, and search with query suggestions, as well as the 'My Character' section for its high-quality functionality and helpful informational cues.",
		tags: [
			"React",
			"TypeScript",
			"GraphQL",
			"MongoDB",
			"Express",
			"Framer Motion",
		],
		featured: false,
		status: "STABLE",
		index: 3,
		githubUrl: "https://github.com/Christio02/dungeons-and-developers.git",
		collaborators: [
			{
				name: "Eirik Engen Kvam",
				githubUrl: "https://github.com/eirikek",
				linkedInUrl: "https://www.linkedin.com/in/eirik-engen-kvam",
			},
			{
				name: "Mats Kvanvik",
				githubUrl: "https://github.com/Matkva",
				linkedInUrl: "https://www.linkedin.com/in/mats-kvanvik",
			},
			{
				name: "August Solli Middelkoop",
				githubUrl: "https://github.com/amiddelkoop",
				linkedInUrl: "https://www.linkedin.com/in/august-solli-middelkoop",
			},
		],
	},
	{
		title: "Flappy Bird: Flight & Firepower",
		description:
			"An experimental twist on Flappy Bird where players blast pipes apart to carve their own path. Built in Unity.",
		tags: ["Unity", "C#", "2D Graphics", "Game Physics"],
		featured: false,
		status: "EXPERIMENTAL",
		index: 4,
		githubUrl: "https://github.com/Christio02/flappy.git",
	},
];

export const SocialLinks: SocialLinksProps[] = [
	{
		name: "Github",
		url: "https://github.com/Christio02/",
	},
	{
		name: "Linkedin",
		url: "https://www.linkedin.com/in/christopher-hoee/",
	},
	{
		name: "Source",
		url: "https://github.com/Christio02/portfolio",
	},
];
