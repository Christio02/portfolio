import { motion } from "motion/react";
import type { FadeInViewProps } from "@/interfaces/ComponentProps";

const FadeInView = ({
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

export default FadeInView;
