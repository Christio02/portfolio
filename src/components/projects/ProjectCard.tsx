import { ExternalLink } from "lucide-react";
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
	const accent = status === "EXPERIMENTAL" ? "accent-warm" : "accent";
	return (
		<motion.article
			className={`flex flex-col gap-4 p-6 border border-border ${
				featured
					? "bg-surface-container  md:gap-5 md:p-8"
					: "bg-surface-container-low"
			}`}
			whileHover={{
				scale: 1.015,
				borderColor: `var(--${accent})`,
			}}
		>
			<div className="flex justify-between items-start mb-4">
				<span
					aria-hidden="true"
					className="font-mono text-xs"
					style={{ color: "var(--text-dim)" }}
				>
					_{String((index ?? 0) + 1).padStart(2, "0")}
				</span>
				<span
					role="img"
					aria-label={`Status: ${status}`}
					className="font-mono text-xs px-2 py-0.5 border letter-spacing-wide"
					style={{
						color: `var(--${accent})`,
						borderColor: `var(--${accent})`,
					}}
				>
					{status}
				</span>
			</div>
			<h3 className="font-display text-2xl md:text-4xl">{title}</h3>
			<p className="font-body text-base md:text-xl">{description}</p>
			<ul className="flex flex-row flex-wrap gap-3">
				{tags.map((tag) => (
					<li
						key={tag}
						className="font-mono text-sm bg-surface-container-highest px-3 py-1 border border-outline-variant"
					>
						{tag}
					</li>
				))}
			</ul>
			{collaboratorsUrl && githubUrl && (
				<>
					<hr className="border-t border-border pt-4 mt-4" />
					<div className="mt-auto flex flex-col gap-3">
						{collaboratorsUrl && (
							<div className="flex flex-col gap-4 mt-2">
								<h4 className="font-mono text-sm uppercase tracking-widest">
									Collaborators:
								</h4>
								<ul className="flex flex-row flex-wrap gap-3 list-none">
									{collaboratorsUrl.map((collaborator) => (
										<li key={collaborator.name}>
											<div className="flex flex-row font-body text-sm bg-surface-container-high border-l-4 border-accent) hover:border-accent transition-colors p-3">
												{!collaborator.githubUrl &&
												!collaborator.linkedInUrl ? (
													<>
														<div className="w-1.5 h-1.5 rounded-full bg-accent" />
														<p>{collaborator.name}</p>
													</>
												) : (
													<ul className="list-none flex flex-row items-center gap-4">
														<div className="w-1.5 h-1.5 rounded-full bg-accent" />
														<li>{collaborator.name}</li>
														<span className="w-px h-4 bg-border shrink-0"></span>
														{collaborator.githubUrl && (
															<li>
																<a
																	href={collaborator.githubUrl}
																	target="_blank"
																	rel="noreferrer noopener"
																	className="font-mono text-xs border border-accent px-2 py-0.5 hover:bg-accent hover:text-bg transition-colors"
																>
																	Github
																</a>
															</li>
														)}
														{collaborator.linkedInUrl && (
															<li>
																<a
																	href={collaborator.linkedInUrl}
																	target="_blank"
																	rel="noreferrer noopener"
																	className="font-mono text-xs border border-accent px-2 py-0.5 hover:bg-accent hover:text-bg transition-colors"
																>
																	Linkedin
																</a>
															</li>
														)}
													</ul>
												)}
											</div>
										</li>
									))}
								</ul>
							</div>
						)}
						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noreferrer noopener"
								className="font-mono text-xs uppercase tracking-widest border border-border px-4 py-2 hover:border-accent hover:text-accent transition-colors w-fit"
							>
								<span className="flex flex-row gap-4">
									View project on github <ExternalLink />
								</span>
							</a>
						)}
					</div>
				</>
			)}
		</motion.article>
	);
};

export default ProjectCard;
