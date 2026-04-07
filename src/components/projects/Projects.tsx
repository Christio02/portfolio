import FadeInView from "@/components/animation/FadeInView";
import { SectionLabel } from "@/components/Homepage";
import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "../../interfaces/DataProps";

type ProjectsProps = {
	projects: ProjectProps[];
};

const Projects = ({ projects }: ProjectsProps) => {
	return (
		<section id="projects" className="py-24 px-6 relative z-1">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="03" label="PROJECTS" />
				</FadeInView>
				<FadeInView>
					<h2 className="font-display text-3xl md:text-5xl text-text-primary mb-12">
						SELECTED
						<br />
						WORKS.
					</h2>
				</FadeInView>
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
