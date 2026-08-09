import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const roles = [
	"distributed systems",
	"data mining & ML",
	"full-stack web apps",
	"backend architecture",
];

const Hero = () => {
	const [roleIndex, setRoleIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentRole = roles[roleIndex];

		const speed = isDeleting
			? 35
			: charIndex === currentRole.length
				? 2200
				: 65;

		const timeout = setTimeout(() => {
			if (!isDeleting && charIndex < currentRole.length) {
				setCharIndex(charIndex + 1);
			}
			if (!isDeleting && charIndex === currentRole.length) {
				setIsDeleting(true);
			}
			if (isDeleting && charIndex > 0) {
				setCharIndex(charIndex - 1);
			}
			if (isDeleting && charIndex === 0) {
				setIsDeleting(false);
				setRoleIndex((roleIndex + 1) % roles.length);
			}
		}, speed);

		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, roleIndex]);

	return (
		<section
			id="hero"
			className="min-h-[90vh] flex items-center px-6 pt-32 pb-20 relative overflow-hidden"
		>
			{/* Subtle ambient light blur */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/10 blur-[120px] pointer-events-none rounded-full" />

			<div className="max-w-5xl mx-auto w-full relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-low border border-border-subtle text-xs font-mono text-text-muted mb-8"
				>
					<span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
					<span>Software Engineer &amp; CS Student @ NTNU</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.6 }}
					className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-text-primary leading-[1.05] mb-6"
				>
					Christopher{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-dim to-accent-warm">
						Høe
					</span>
				</motion.h1>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.25, duration: 0.6 }}
					className="text-lg sm:text-2xl text-text-muted font-body font-normal max-w-2xl leading-relaxed mb-10 flex flex-wrap items-center gap-x-2"
				>
					<span>Building software focused on</span>
					<span className="font-mono text-accent font-medium bg-surface-low px-2.5 py-0.5 rounded border border-border-subtle inline-flex items-center min-h-[36px]">
						{roles[roleIndex].substring(0, charIndex)}
						<span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse" />
					</span>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="flex flex-wrap items-center gap-4"
				>
					<motion.a
						href="#projects"
						className="inline-flex items-center justify-center bg-accent hover:bg-accent-dim text-white font-medium text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-accent/25 transition-all"
						whileHover={{ scale: 1.02, y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						Explore Projects
					</motion.a>
					<motion.a
						href="https://github.com/Christio02"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View GitHub profile (opens in new tab)"
						className="inline-flex items-center gap-2 bg-surface border border-border text-text-primary font-medium text-sm px-6 py-3.5 rounded-xl hover:border-accent hover:text-accent transition-all shadow-sm"
						whileHover={{ scale: 1.02, y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						GitHub Profile
						<ArrowUpRight size={16} aria-hidden="true" />
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
