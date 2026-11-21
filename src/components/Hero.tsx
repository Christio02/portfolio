import { ArrowRight, ArrowUpRight, Command } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BlueprintField from "./BlueprintField";

interface HeroProps {
	onOpenCommandPalette: () => void;
}

const roles = [
	"information retrieval",
	"data mining & ML",
	"full-stack web apps",
	"backend architecture",
];

const specs = [
	{
		label: "Current Role",
		value: "Software Engineer",
		detail: "Hoggorm Design A/S",
		accent: "primary" as const,
	},
	{
		label: "Recent Experience",
		value: "AI/ML Intern",
		detail: "Kongsberg Defence & Aerospace",
		accent: "warm" as const,
	},
	{
		label: "Education",
		value: "M.Sc. Computer Science",
		detail: "NTNU · IR, ML & Distributed Systems",
		accent: "primary" as const,
	},
];

const Hero = ({ onOpenCommandPalette }: HeroProps) => {
	const sectionRef = useRef<HTMLElement>(null);
	const pointerRef = useRef({ x: -9999, y: -9999, active: false });

	const [roleIndex, setRoleIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentRole = roles[roleIndex];

		const speed = isDeleting
			? 35
			: charIndex === currentRole.length
				? 2200
				: 60;

		const timeout = setTimeout(() => {
			if (!isDeleting && charIndex < currentRole.length) {
				setCharIndex(charIndex + 1);
			} else if (!isDeleting && charIndex === currentRole.length) {
				setIsDeleting(true);
			} else if (isDeleting && charIndex > 0) {
				setCharIndex(charIndex - 1);
			} else if (isDeleting && charIndex === 0) {
				setIsDeleting(false);
				setRoleIndex((roleIndex + 1) % roles.length);
			}
		}, speed);

		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, roleIndex]);

	const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
		const rect = sectionRef.current?.getBoundingClientRect();
		if (!rect) return;
		pointerRef.current = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
			active: true,
		};
	};

	const handlePointerLeave = () => {
		pointerRef.current.active = false;
	};

	return (
		<section
			ref={sectionRef}
			id="hero"
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			className="min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-6 relative overflow-hidden border-b border-border"
		>
			<BlueprintField pointerRef={pointerRef} />

			{/* Subtle vignette so typography stays sharp over the vector field */}
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none bg-gradient-to-b from-bg/75 via-bg/55 to-bg/95"
			/>

			{/* Top Quick Jump Rail */}
			<div className="max-w-6xl mx-auto w-full relative z-10">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					className="flex items-center justify-end pb-4"
				>
					<button
						type="button"
						onClick={onOpenCommandPalette}
						className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors cursor-pointer"
					>
						<Command size={13} className="text-accent" />
						<span>Quick Jump</span>
					</button>
				</motion.div>
			</div>

			{/* Main Hero Content */}
			<div className="max-w-6xl mx-auto w-full relative z-10 py-14 sm:py-20">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
					<div className="lg:col-span-8">
						<motion.p
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45 }}
							className="font-mono text-sm text-accent font-medium mb-4"
						>
							Software Engineer &amp; CS Student at NTNU
						</motion.p>

						<motion.h1
							initial={{ opacity: 0, y: 22 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.08, duration: 0.55 }}
							className="font-display text-5xl sm:text-7xl md:text-[5rem] font-bold tracking-[-0.03em] text-text-primary leading-[1.04] mb-7"
						>
							Christopher Høe<span className="text-accent">.</span>
						</motion.h1>

						{/* Restored Typewriter */}
						<motion.div
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.18, duration: 0.55 }}
							className="text-xl sm:text-2xl text-text-muted font-body font-normal max-w-2xl leading-relaxed mb-10 flex flex-wrap items-center gap-x-2.5 gap-y-2"
						>
							<span>Building software focused on</span>
							<span className="font-mono text-accent font-medium bg-surface/90 px-3 py-1 rounded-md border border-border inline-flex items-center min-h-[42px]">
								{roles[roleIndex].substring(0, charIndex)}
								<span
									aria-hidden="true"
									className="inline-block w-2 h-5 bg-accent ml-1.5 animate-pulse"
								/>
							</span>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.28, duration: 0.55 }}
							className="flex flex-wrap items-center gap-3.5"
						>
							<motion.a
								href="#projects"
								whileHover={{ y: -2, scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: "spring", stiffness: 420, damping: 24 }}
								className="group inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dim text-accent-fg font-body text-sm sm:text-base font-semibold px-6 py-3.5 rounded-md transition-colors shadow-sm"
							>
								<span>Explore Projects</span>
								<ArrowRight
									size={16}
									className="transition-transform group-hover:translate-x-1"
								/>
							</motion.a>
							<motion.a
								href="https://github.com/Christio02"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View GitHub profile (opens in new tab)"
								whileHover={{ y: -2, scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: "spring", stiffness: 420, damping: 24 }}
								className="inline-flex items-center gap-2 bg-surface/90 border border-border hover:border-accent text-text-primary hover:text-accent font-body text-sm sm:text-base font-medium px-6 py-3.5 rounded-md transition-colors"
							>
								<span>GitHub Profile</span>
								<ArrowUpRight size={16} aria-hidden="true" />
							</motion.a>
							<a
								href="#contact"
								className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary font-body text-sm sm:text-base font-medium px-3 py-3.5 transition-colors"
							>
								<span>Get in touch</span>
							</a>
						</motion.div>
					</div>

					{/* Right-hand Focus Panel */}
					<motion.div
						initial={{ opacity: 0, x: 18 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.34, duration: 0.55 }}
						className="lg:col-span-4 hidden lg:block"
					>
						<div className="p-6 bg-surface/90 backdrop-blur-xs border border-border rounded-md corner-ticks">
							<div className="font-mono text-xs uppercase tracking-wider text-text-dim mb-4">
								Focus Areas
							</div>
							<ul className="space-y-3 text-sm text-text-primary">
								<li className="flex items-center justify-between border-b border-border-subtle pb-2.5">
									<span className="font-medium">Full-Stack Systems</span>
									<span className="font-mono text-xs text-text-muted">
										TS · React · .NET
									</span>
								</li>
								<li className="flex items-center justify-between border-b border-border-subtle pb-2.5">
									<span className="font-medium">Machine Learning &amp; CV</span>
									<span className="font-mono text-xs text-text-muted">
										PyTorch · OpenCV
									</span>
								</li>
								<li className="flex items-center justify-between">
									<span className="font-medium">Information Retrieval</span>
									<span className="font-mono text-xs text-text-muted">
										Indexing · Search
									</span>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Bottom 3-Column Summary Strip */}
			<div className="max-w-6xl mx-auto w-full relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.55 }}
					className="grid grid-cols-1 md:grid-cols-3 border border-border bg-surface/85 backdrop-blur-xs rounded-md divide-y md:divide-y-0 md:divide-x divide-border"
				>
					{specs.map((spec) => (
						<div key={spec.label} className="p-5">
							<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-dim mb-1.5">
								<span
									className={`w-2 h-2 inline-block rounded-xs ${
										spec.accent === "warm" ? "bg-accent-warm" : "bg-accent"
									}`}
								/>
								<span>{spec.label}</span>
							</div>
							<div className="font-display font-semibold text-base text-text-primary">
								{spec.value}
							</div>
							<div className="font-body text-sm text-text-muted mt-0.5">
								{spec.detail}
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
