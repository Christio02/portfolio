import { ArrowUpRight, ExternalLink, Users } from "lucide-react";
import { motion } from "motion/react";
import type { ProjectProps } from "@/interfaces/DataProps";

export interface ProjectCardExtendedProps extends ProjectProps {
	variant?: "lead" | "featured" | "compact";
	isHighlighted?: boolean;
	displayIndex: number;
}

export const slugifyProject = (title: string) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

const ProjectCard = ({
	title,
	description,
	tags,
	status,
	githubUrl,
	collaborators,
	variant = "featured",
	isHighlighted = false,
	displayIndex,
}: ProjectCardExtendedProps) => {
	const isExperimental = status === "EXPERIMENTAL";
	const isLead = variant === "lead";
	const formattedIndex = String(displayIndex).padStart(2, "0");

	const statusClasses = isExperimental
		? "bg-accent-warm/15 text-accent-warm-dim dark:text-accent-warm border-accent-warm/40"
		: "bg-accent/12 text-accent border-accent/35";

	if (isLead) {
		return (
			<motion.article
				id={`project-${slugifyProject(title)}`}
				layout
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-40px" }}
				whileHover={{ y: -3 }}
				transition={{ type: "spring", stiffness: 320, damping: 26 }}
				className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 bg-surface border rounded-md overflow-hidden corner-ticks transition-shadow hover:shadow-md ${
					isHighlighted
						? "border-accent ring-2 ring-accent/35"
						: "border-border hover:border-accent/60"
				}`}
			>
				{/* Left Overview */}
				<div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between">
					<div>
						<div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-xs">
							<span className="text-accent font-semibold tabular-nums">
								{formattedIndex} · Featured
							</span>
							<span
								className={`px-2.5 py-0.5 rounded-xs border font-semibold tracking-wider ${statusClasses}`}
							>
								{status}
							</span>
						</div>

						<h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight mb-4">
							{title}
						</h3>

						<p className="font-body text-text-muted text-base leading-relaxed">
							{description}
						</p>
					</div>

					<div className="mt-7 pt-5 border-t border-border-subtle flex flex-wrap items-center gap-8 text-sm">
						<div>
							<span className="block font-mono text-xs text-text-dim mb-0.5">
								Partner
							</span>
							<span className="text-text-primary font-medium">
								Heimdal Storband &amp; Bouvet ASA
							</span>
						</div>
						<div>
							<span className="block font-mono text-xs text-text-dim mb-0.5">
								Team
							</span>
							<span className="text-text-primary font-medium">
								7 Engineers (B.Sc. Project)
							</span>
						</div>
					</div>
				</div>

				{/* Right Stack & Source Panel */}
				<div className="lg:col-span-5 p-7 sm:p-9 bg-surface-low/65 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-between gap-6">
					<div>
						<div className="font-mono text-xs text-text-dim uppercase tracking-wider mb-3.5">
							Technologies
						</div>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<span
									key={tag}
									className="font-mono text-xs sm:text-sm bg-surface text-text-primary px-3 py-1.5 rounded-sm border border-border font-medium"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					{githubUrl && (
						<motion.a
							href={githubUrl}
							target="_blank"
							rel="noreferrer noopener"
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.98 }}
							className="group inline-flex items-center justify-between gap-3 font-body text-sm font-semibold bg-accent hover:bg-accent-dim text-accent-fg px-5 py-3.5 rounded-md transition-colors w-full"
						>
							<span className="flex items-center gap-2">
								<ExternalLink size={16} />
								<span>View Source on GitHub</span>
							</span>
							<ArrowUpRight
								size={16}
								className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</motion.a>
					)}
				</div>
			</motion.article>
		);
	}

	return (
		<motion.article
			id={`project-${slugifyProject(title)}`}
			layout
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			whileHover={{ y: -4 }}
			transition={{ type: "spring", stiffness: 320, damping: 26 }}
			className={`scroll-mt-24 flex flex-col justify-between h-full bg-surface border rounded-md p-6 sm:p-7 transition-shadow hover:shadow-md group ${
				variant === "featured" ? "corner-ticks" : ""
			} ${
				isHighlighted
					? "border-accent ring-2 ring-accent/35"
					: "border-border hover:border-accent/60"
			}`}
		>
			<div>
				<div className="flex items-center justify-between gap-3 mb-5 font-mono text-xs">
					<span className="text-text-dim tabular-nums font-medium">
						{formattedIndex}
						{variant === "featured" ? " · Featured" : ""}
					</span>
					<span
						className={`px-2.5 py-0.5 rounded-xs border font-semibold tracking-wider ${statusClasses}`}
					>
						{status}
					</span>
				</div>

				<h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-accent transition-colors mb-3 leading-snug">
					{title}
				</h3>

				<p className="font-body text-text-muted text-sm sm:text-base leading-relaxed mb-6">
					{description}
				</p>

				<div className="flex flex-wrap gap-2 mb-6">
					{tags.map((tag) => (
						<span
							key={tag}
							className="font-mono text-xs sm:text-sm bg-surface-low text-text-primary px-2.5 py-1 rounded-sm border border-border-subtle"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			{(collaborators || githubUrl) && (
				<div className="pt-5 border-t border-border-subtle flex flex-col gap-4">
					{collaborators && collaborators.length > 0 && (
						<div>
							<div className="flex items-center gap-1.5 text-xs font-mono text-text-dim mb-2.5 uppercase tracking-wider">
								<Users size={13} />
								<span>Collaborators</span>
							</div>
							<div className="flex flex-wrap gap-2">
								{collaborators.map((collaborator) => (
									<div
										key={collaborator.name}
										className="inline-flex items-center gap-2 bg-surface-low border border-border-subtle px-2.5 py-1 rounded-sm text-xs"
									>
										<span className="font-body font-medium text-text-primary">
											{collaborator.name}
										</span>
										{collaborator.githubUrl && (
											<a
												href={collaborator.githubUrl}
												target="_blank"
												rel="noreferrer noopener"
												aria-label={`${collaborator.name} GitHub`}
												className="text-text-muted hover:text-accent font-mono transition-colors"
											>
												GitHub
											</a>
										)}
										{collaborator.linkedInUrl && (
											<a
												href={collaborator.linkedInUrl}
												target="_blank"
												rel="noreferrer noopener"
												aria-label={`${collaborator.name} LinkedIn`}
												className="text-text-muted hover:text-accent font-mono transition-colors"
											>
												LinkedIn
											</a>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{githubUrl && (
						<a
							href={githubUrl}
							target="_blank"
							rel="noreferrer noopener"
							className="group/link inline-flex items-center justify-between gap-2 font-body text-sm font-medium bg-surface-low border border-border text-text-primary px-4 py-2.5 rounded-md hover:border-accent hover:text-accent transition-colors w-full"
						>
							<span className="flex items-center gap-2">
								<ExternalLink size={15} />
								<span>View Source on GitHub</span>
							</span>
							<ArrowUpRight
								size={15}
								className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
							/>
						</a>
					)}
				</div>
			)}
		</motion.article>
	);
};

export default ProjectCard;
