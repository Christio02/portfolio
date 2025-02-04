import { motion } from 'framer-motion';

interface Project {
	title: string;
	description: string;
	image: string;
	link: string;
}

const projects: Project[] = [
	{
		title: 'Project 1',
		description: 'A brief description of project 1',
		image: '/placeholder.svg?height=200&width=300',
		link: '#'
	},
	{
		title: 'Project 2',
		description: 'A brief description of project 2',
		image: '/placeholder.svg?height=200&width=300',
		link: '#'
	}
];

const Projects = () => {
	return (
		<div className="py-12">
			<h2 className="text-gradient-3 mb-8 text-center text-3xl font-bold">My Projects</h2>
			<div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-2">
				{projects.map((project, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800"
					>
						<img
							src={project.image || '/placeholder.svg'}
							alt={project.title}
							className="h-48 w-full object-cover"
						/>
						<div className="p-6">
							<h3 className="text-gradient-2 mb-2 text-xl font-semibold">{project.title}</h3>
							<p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
							<a
								href={project.link}
								className="bg-gradient-1 inline-block rounded-md px-4 py-2 font-medium text-white transition-all duration-300 hover:opacity-90"
							>
								Learn More →
							</a>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Projects;
