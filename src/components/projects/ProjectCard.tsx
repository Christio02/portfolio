import { ArrowUpRight, ExternalLink, Users } from "lucide-react";
import { motion } from "motion/react";
import type { ProjectProps } from "@/interfaces/DataProps";

const ProjectCard = ({
	title,
	description,
	tags,
	featured,
	status,
	index,
	githubUrl,
	collaborators: collaboratorsUrl,
}: ProjectProps) => {
	const isExperimental = status === "EXPERIMENTAL";

	return (
		<motion.article
			className={`flex flex-col justify-between p-8 rounded-2xl border transition-all h-full bg-surface ${
				featured
					? "border-accent/40 shadow-md shadow-accent/5"
					: "border-border hover:border-accent/30 shadow-sm"
			}`}
			whileHover={{ y: -4 }}
		>
			<div>
				<div className="flex justify-between items-center mb-5">
					<span className="font-mono text-xs text-text-dim font-medium">
						0{String((index ?? 0) + 1)}
					</span>
					<span
						className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
							isExperimental
								? "bg-accent-warm/10 text-accent-warm border-accent-warm/30"
								: "bg-accent/10 text-accent border-accent/30"
						}`}
					>
						{status}
					</span>
				</div>

				<h3 className="font-display text-2xl font-bold text-text-primary mb-3 leading-snug">
					{title}
				</h3>
				<p className="font-body text-text-muted text-sm sm:text-base leading-relaxed mb-6">
					{description}
				</p>

				<div className="flex flex-wrap gap-2 mb-6">
					{tags.map((tag) => (
						<span
							key={tag}
							className="font-mono text-xs bg-surface-low text-text-muted px-2.5 py-1 rounded-lg border border-border-subtle"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			<div>
				{(collaboratorsUrl || githubUrl) && (
					<div className="pt-5 border-t border-border-subtle flex flex-col gap-4">
						{collaboratorsUrl && collaboratorsUrl.length > 0 && (
							<div>
								<div className="flex items-center gap-1.5 text-xs font-mono text-text-dim mb-2.5 uppercase tracking-wider">
									<Users size={14} />
									<span>Collaborators</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{collaboratorsUrl.map((collaborator) => (
										<div
											key={collaborator.name}
											className="inline-flex items-center gap-2 bg-surface-low border border-border-subtle px-3 py-1.5 rounded-lg text-xs"
										>
											<span className="font-medium text-text-primary">
												{collaborator.name}
											</span>
											{collaborator.githubUrl && (
												<a
													href={collaborator.githubUrl}
													target="_blank"
													rel="noreferrer noopener"
													aria-label={`${collaborator.name} GitHub`}
													className="text-xs text-text-muted hover:text-accent font-mono transition-colors"
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
													className="text-xs text-text-muted hover:text-accent font-mono transition-colors"
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
								className="inline-flex items-center justify-between gap-2 font-mono text-xs font-medium bg-surface-low border border-border text-text-primary px-4 py-2.5 rounded-xl hover:border-accent hover:text-accent transition-all w-full"
							>
								<span className="flex items-center gap-2">
									<ExternalLink size={14} />
									View Source on GitHub
								</span>
								<ArrowUpRight size={14} />
							</a>
						)}
					</div>
				)}
			</div>
		</motion.article>
	);
};

export default ProjectCard;
