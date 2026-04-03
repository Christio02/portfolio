import type { ProjectProps } from "@/interfaces/DataProps";

const ProjectCard = ({
	title,
	description,
	tags,
	featured,
	status,
}: ProjectProps) => {
	return (
		<article
			className={`flex flex-col gap-4 border p-6 ${
				featured
					? "border-accent-warm bg-surface-container-low  md:gap-5 md:p-8"
					: "border-outline bg-surface"
			}`}
		>
			<h3 className="font-display text-4xl">{title}</h3>
			<p className="font-body text-xl">{description}</p>
			<ul className="flex flex-row gap-3">
				{tags.map((tag) => (
					<li
						key={tag}
						className="font-mono text-sm bg-surface-container-highest p-4 border border-accent-warm"
					>
						{tag}
					</li>
				))}
			</ul>
			<data
				value={status}
				className={`inline-flex w-fit items-center border px-3 py-1 font-mono text-sm uppercase tracking-wide ${
					status === "STABLE" || status === "PRODUCTION"
						? "border-primary text-text-primary bg-primary/10"
						: "border-outline text-text-muted bg-surface-container-highest"
				}`}
			>
				{status}
			</data>
		</article>
	);
};

export default ProjectCard;
