import type { SectionLabelProps } from "@/interfaces/ComponentProps";

const SectionLabel = ({ index, label }: SectionLabelProps) => {
	return (
		<div className="flex items-center gap-3 mb-8">
			<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-low border border-border-subtle text-xs font-mono">
				<span className="text-accent font-semibold">{index}</span>
				<span className="text-text-muted uppercase tracking-wider font-medium">
					{label}
				</span>
			</div>
			<div className="flex-1 h-px bg-border-subtle opacity-70" />
		</div>
	);
};

export default SectionLabel;
