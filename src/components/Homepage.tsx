import { motion } from "motion/react";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

interface FadeInViewProps {
	children: React.ReactNode;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
	className?: string;
	style?: React.CSSProperties;
}
export const FadeInView = ({
	children,
	delay = 0,
	direction = "up",
	className = "",
	style = {},
}: FadeInViewProps) => {
	const dirMap = {
		up: { y: 40 },
		down: { y: -40 },
		left: { x: -40 },
		right: { x: 40 },
		none: {},
	};
	return (
		<motion.div
			className={className}
			style={style}
			initial={{ opacity: 0, ...dirMap[direction] }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
		>
			{children}
		</motion.div>
	);
};

interface SectionLabelProps {
	index: string;
	label: string;
}

export const SectionLabel = ({ index, label }: SectionLabelProps) => {
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

const Homepage = () => {
	return (
		<main>
			<Hero />
			<About />
			<Skills />
		</main>
	);
};

export default Homepage;
