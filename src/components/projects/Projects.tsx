import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import FadeInView from "@/components/animation/FadeInView";
import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectProps } from "@/interfaces/DataProps";
import SectionLabel from "@/ui/SectionLabel";

type FilterType = "ALL" | "FEATURED" | "STABLE" | "EXPERIMENTAL";

interface ProjectsSectionProps {
	projects: ProjectProps[];
	highlightedProject?: string | null;
}

const LEAD_PROJECT_TITLE = "Online Sheet Music Management";

const FILTER_LABELS: Record<FilterType, string> = {
	ALL: "All",
	FEATURED: "Featured",
	STABLE: "Stable",
	EXPERIMENTAL: "Experimental",
};

const Projects = ({ projects, highlightedProject }: ProjectsSectionProps) => {
	const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

	const counts = useMemo(
		() => ({
			ALL: projects.length,
			FEATURED: projects.filter((p) => p.featured).length,
			STABLE: projects.filter((p) => p.status === "STABLE").length,
			EXPERIMENTAL: projects.filter((p) => p.status === "EXPERIMENTAL").length,
		}),
		[projects],
	);

	// Order projects so Online Sheet Music Management leads, followed by other featured, then remaining
	const orderedProjects = useMemo(() => {
		const lead = projects.find((p) => p.title === LEAD_PROJECT_TITLE);
		const otherFeatured = projects.filter(
			(p) => p.featured && p.title !== LEAD_PROJECT_TITLE,
		);
		const rest = projects.filter(
			(p) => !p.featured && p.title !== LEAD_PROJECT_TITLE,
		);
		return [...(lead ? [lead] : []), ...otherFeatured, ...rest];
	}, [projects]);

	const visibleProjects = useMemo(() => {
		if (activeFilter === "ALL") return orderedProjects;
		if (activeFilter === "FEATURED")
			return orderedProjects.filter((p) => p.featured);
		return orderedProjects.filter((p) => p.status === activeFilter);
	}, [orderedProjects, activeFilter]);

	const filters: FilterType[] = ["ALL", "FEATURED", "STABLE", "EXPERIMENTAL"];

	const showLeadLayout =
		(activeFilter === "ALL" || activeFilter === "FEATURED") &&
		visibleProjects.length > 0 &&
		visibleProjects[0].title === LEAD_PROJECT_TITLE;

	const leadProject = showLeadLayout ? visibleProjects[0] : null;
	const gridProjects = showLeadLayout
		? visibleProjects.slice(1)
		: visibleProjects;

	return (
		<section
			id="projects"
			className="py-24 px-6 relative z-10 border-b border-border"
		>
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="03" label="Projects" />
				</FadeInView>

				<FadeInView>
					<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
						<div>
							<h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-[1.08] mb-3">
								Featured Projects
							</h2>
							<p className="text-text-muted font-body text-base sm:text-lg max-w-xl leading-relaxed">
								A selection of full-stack web applications, research projects,
								and engineering experiments.
							</p>
						</div>

						{/* Filter Tabs */}
						<div
							role="tablist"
							aria-label="Filter projects"
							className="inline-flex flex-wrap items-center gap-1 p-1 bg-surface-low border border-border rounded-md self-start lg:self-auto"
						>
							{filters.map((filter) => {
								const isActive = activeFilter === filter;
								return (
									<button
										key={filter}
										type="button"
										role="tab"
										aria-selected={isActive}
										onClick={() => setActiveFilter(filter)}
										className={`relative px-3.5 py-2 font-body text-sm rounded-sm transition-colors cursor-pointer ${
											isActive
												? "text-text-primary font-semibold"
												: "text-text-muted hover:text-text-primary font-medium"
										}`}
									>
										{isActive && (
											<motion.span
												layoutId="projectFilterPill"
												className="absolute inset-0 bg-surface border border-border rounded-sm shadow-2xs"
												transition={{
													type: "spring",
													stiffness: 420,
													damping: 32,
												}}
											/>
										)}
										<span className="relative z-10 inline-flex items-center gap-1.5">
											<span>{FILTER_LABELS[filter]}</span>
											<span className="font-mono text-xs text-accent tabular-nums">
												{counts[filter]}
											</span>
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</FadeInView>

				{/* Asymmetric 1 + 2 + 2 Showcase */}
				<div className="flex flex-col gap-6">
					<AnimatePresence mode="popLayout">
						{leadProject && (
							<ProjectCard
								key={leadProject.title}
								{...leadProject}
								variant="lead"
								displayIndex={1}
								isHighlighted={highlightedProject === leadProject.title}
							/>
						)}
					</AnimatePresence>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<AnimatePresence mode="popLayout">
							{gridProjects.map((project, idx) => (
								<ProjectCard
									key={project.title}
									{...project}
									variant={project.featured ? "featured" : "compact"}
									displayIndex={leadProject ? idx + 2 : idx + 1}
									isHighlighted={highlightedProject === project.title}
								/>
							))}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Projects;
