import type {
	ExperiencesProps,
	ProjectsProps,
	SkillGroupsProps,
} from "#/interfaces/DataProps";

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
	{
		role: "CS Student",
		company: "NTNU",
		period: "2022 – present",
		bullets: [
			"Third-year Bachelor in Computer Science",
			"Focus: distributed systems, AI/ML, data mining, web development",
			"Developed REST APIs in Java/C# and advanced web applications",
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
		icon: "⌘",
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
		icon: "◈",
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
		icon: "◎",
		accent: "primary",
	},
	{
		category: "infrastructure",
		items: ["Docker", "Azure", "CI/CD", "Git", "Linux"],
		icon: "△",
		accent: "secondary",
	},
];

export const projects: ProjectsProps[] = [
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
	},
	{
		title: "Online Sheet Music Management",
		description:
			"A web-based system to simplify how bands manage, organize, and distribute sheet music. Developed for Heimdal Storband in collaboration with Bouvet ASA.",
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
		status: "PRODUCTION",
	},
	{
		title: "Dungeons and Developers",
		description:
			"Explore D&D mechanics: build characters, browse classes, monsters, races, and ability scores with a full GraphQL backend.",
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
	},
	{
		title: "Flappy Bird: Flight & Firepower",
		description:
			"An experimental twist on Flappy Bird where players blast pipes apart to carve their own path. Built in Unity with procedural audio.",
		tags: ["Unity", "C#", "2D Graphics", "Game Physics"],
		featured: false,
		status: "EXPERIMENTAL",
	},
];
