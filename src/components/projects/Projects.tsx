import FadeInView from "@/components/animation/FadeInView";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionLabel from "@/ui/SectionLabel";
import type { ProjectProps } from "../../interfaces/DataProps";

type ProjectsProps = {
	projects: ProjectProps[];
};

const Projects = ({ projects }: ProjectsProps) => {
	return (
		<section id="projects" className="py-24 px-6 relative z-10">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="03" label="Projects" />
				</FadeInView>
				<FadeInView>
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
						<div>
							<h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
								Featured Projects
							</h2>
						</div>
						<p className="text-text-muted font-body text-base max-w-lg leading-relaxed">
							A selection of full-stack web applications, open-source projects,
							and engineering experiments.
						</p>
					</div>
				</FadeInView>
				<div className="grid gap-6 grid-cols-1 md:grid-cols-2">
					{projects.map((project, index) => (
						<FadeInView key={project.title} direction="up" delay={index * 0.1}>
							<ProjectCard
								title={project.title}
								description={project.description}
								tags={project.tags}
								featured={project.featured}
								status={project.status}
								index={index}
								githubUrl={project.githubUrl}
								collaborators={project.collaborators}
							/>
						</FadeInView>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
