import type { SectionLabelProps } from "@/interfaces/ComponentProps";

const SectionLabel = ({ index, label }: SectionLabelProps) => {
	return (
		<div className="flex items-center gap-3 mb-8">
			<span className="font-mono text-[12px] text-accent tracking-[0.15em]">
				{index}
			</span>
			<span className="font-mono text-[12px] text-text-muted tracking-[0.15em] uppercase">
				/ {label}
			</span>
			<div className="flex-1 h-px bg-border-subtle" />
		</div>
	);
};

export default SectionLabel;
