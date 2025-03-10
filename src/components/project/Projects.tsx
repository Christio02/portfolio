import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ProjectCardProps } from './ProjectCard';
import ProjectCard from './ProjectCard';

const projects: ProjectCardProps[] = [
	{
		title: 'Project 1',
		desc: 'A brief description of project 1',
		techStack: ['React', 'Tailwind', 'Node', 'Apollo Server and Client', 'GraphQL', 'MongoDB'],
		projectLink: '#'
	},
	{
		title: 'Project 2',
		desc: 'A brief description of project 2',
		techStack: ['React', 'Tailwind', 'Node', 'Apollo Server and Client', 'GraphQL', 'MongoDB'],

		projectLink: '#'
	}
];

const Projects = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="flex flex-col gap-y-5 py-12"
		>
			<h2 className="text-gradient-3 mb-8 inline-block text-center text-4xl font-bold">
				My Projects
			</h2>

			<div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-2">
				{projects.map((project, index) => (
					<ProjectCard
						key={index}
						title={project.title}
						desc={project.desc}
						imageUrl={project.imageUrl}
						techStack={project.techStack}
						projectLink={project.projectLink}
					/>
				))}
			</div>
		</motion.section>
	);
};

export default Projects;
