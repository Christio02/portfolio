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
			initial={{ opacity: 0, scale: 0.9, y: 50 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				duration: 0.6,
				ease: [0.4, 0, 0.2, 1],
				delay
			}}
			whileHover={{
				scale: 1.05,
				y: -10,
				transition: { duration: 0.3, ease: 'easeOut' }
			}}
			whileTap={{ scale: 0.98 }}
			className="group from-secondary to-card dark:from-secondary/50 dark:to-card/50 relative block h-full overflow-hidden rounded-xl bg-gradient-to-br p-1 text-inherit no-underline shadow-lg transition-all duration-500 hover:shadow-2xl"
		>
			{/* Animated border gradient */}
			<motion.div
				className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))',
					backgroundSize: '300% 300%'
				}}
				animate={{
					backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>

			<div className="bg-card relative z-10 flex h-full flex-col overflow-hidden rounded-lg p-6">
				<div className="relative mb-4 overflow-hidden rounded-lg">
					<motion.img
						src={projectImage.src}
						alt={`${title} project screenshot`}
						width={projectImage.width}
						height={projectImage.height}
						style={{ viewTransitionName: `project-image-${title}` }}
						className="h-48 w-full object-cover transition-transform duration-500"
						loading="lazy"
						decoding="async"
						whileHover={{ scale: 1.1, rotate: 1 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					/>
					<motion.div
						className="bg-gradient-1 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
						initial={{ opacity: 0 }}
						whileHover={{ opacity: 0.4 }}
					/>

					{/* Floating action indicator */}
					<motion.div
						className="absolute top-2 right-2 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm group-hover:opacity-100"
						initial={{ opacity: 0, scale: 0 }}
						whileHover={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						<ArrowUpRight className="h-4 w-4 text-white" />
					</motion.div>
				</div>

				<motion.h3
					className="text-gradient-2 mb-2 text-2xl font-bold"
					style={{ viewTransitionName: `project-title-${title}` }}
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.2 }}
				>
					{title}
				</motion.h3>

				<motion.p
					className="text-muted-foreground mb-4 flex-grow text-lg"
					initial={{ opacity: 0.8 }}
					whileHover={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					{desc}
				</motion.p>

				<div className="mb-4 flex flex-wrap gap-2">
					{techStack.map((tech, index) => (
						<motion.span
							key={tech}
							className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-medium"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.3,
								delay: delay + 0.1 + index * 0.05,
								ease: 'easeOut'
							}}
							whileHover={{
								scale: 1.1,
								backgroundColor: 'hsl(var(--primary))',
								transition: { duration: 0.2 }
							}}
						>
							{tech}
						</motion.span>
					))}
				</div>

				<motion.div
					className="mt-auto flex items-center justify-between"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: delay + 0.2 }}
				>
					<span className="text-muted-foreground group-hover:text-primary text-sm transition-colors duration-300">
						Click to view project
					</span>
					<motion.div
						whileHover={{
							x: 4,
							y: -4,
							scale: 1.2
						}}
						transition={{ duration: 0.2 }}
					>
						<ArrowUpRight className="text-primary h-5 w-5 transition-all duration-300" />
					</motion.div>
				</motion.div>
			</div>
		</motion.a>
	);
};

export default ProjectCard;
