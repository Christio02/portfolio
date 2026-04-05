import { motion } from "motion/react";
import type { ProjectProps } from "@/interfaces/DataProps";

const ProjectCard = ({
	title,
	description,
	tags,
	featured,
	status,
	index,
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
					style={{ color: `var(--${accent})`, borderColor: `var(--${accent})` }}
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
		</motion.article>
	);
};

export default ProjectCard;
