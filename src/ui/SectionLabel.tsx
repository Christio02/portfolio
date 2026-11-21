import type { SectionLabelProps } from "@/interfaces/ComponentProps";

const SectionLabel = ({ index, label }: SectionLabelProps) => {
	return (
		<div className="flex items-center gap-4 mb-10">
			<div className="inline-flex items-center gap-2.5 shrink-0 font-mono text-sm tracking-wider uppercase">
				<span className="text-accent font-semibold tabular-nums">{index}</span>
				<span className="text-text-primary font-semibold">{label}</span>
			</div>
			<div className="flex-1 h-px bg-border" />
		</div>
	);
};

export default SectionLabel;
