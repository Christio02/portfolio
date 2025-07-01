import { getProjectImage } from '@/lib/images';
import { slugifyLink } from '@/lib/slugifyLink';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
	title: string;
	desc: string;
	imageUrl?: string;
	techStack: string[];
	delay?: number;
}

const ProjectCard = ({ title, desc, imageUrl, techStack, delay = 0 }: ProjectCardProps) => {
	const projectImage = getProjectImage(imageUrl);

	return (
		<motion.a
			href={`/projects/${slugifyLink(title)}`}
			initial={{ opacity: 0, scale: 0.95, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 0.3, ease: 'easeInOut', delay }}
			whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
			className="group from-secondary to-card dark:from-secondary/50 dark:to-card/50 relative block h-full overflow-hidden rounded-xl bg-gradient-to-br p-1 text-inherit no-underline shadow-lg transition-all duration-300 hover:shadow-2xl"
		>
			<div className="bg-card flex h-full flex-col overflow-hidden rounded-lg p-6">
				<div className="relative mb-4 overflow-hidden rounded-lg">
					<img
						src={projectImage.src}
						alt={`${title} project screenshot`}
						width={projectImage.width}
						height={projectImage.height}
						style={{ viewTransitionName: `project-image-${title}` }}
						className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
						loading="lazy" // Good practice for performance
						decoding="async"
					/>
					<div className="bg-gradient-1 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
				</div>

				<h3
					className="text-gradient-2 mb-2 text-2xl font-bold"
					style={{ viewTransitionName: `project-title-${title}` }}
				>
					{title}
				</h3>

				<p className="text-muted-foreground mb-4 flex-grow text-lg">{desc}</p>

				<div className="mb-4 flex flex-wrap gap-2">
					{techStack.map((tech) => (
						<span
							key={tech}
							className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-medium"
						>
							{tech}
						</span>
					))}
				</div>

				<div className="mt-auto flex items-center justify-between">
					<span className="text-muted-foreground text-sm">Click to view project</span>
					<ArrowUpRight className="text-primary h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
				</div>
			</div>
		</motion.a>
	);
};

export default ProjectCard;
