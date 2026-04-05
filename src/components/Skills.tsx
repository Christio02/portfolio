import { motion } from "motion/react";
import FadeInView from "@/components/animation/FadeInView";
import { skillGroups } from "@/data/data";
import type { SkillGroupsProps } from "@/interfaces/DataProps";
import { SectionLabel } from "./Homepage";

const Skills = () => {
	const containerV = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.04 } },
	};

	const itemV = {
		hidden: { opacity: 0, y: 12 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	return (
		<section id="skills" className="py-24 px-6">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="02" label="SKILLS" />
				</FadeInView>
				<FadeInView>
					<div className="flex flex-wrap content-end gap-6 justify-between items-end mb-12">
						<h2 className="text-5xl font-display text-text-primary">
							TECHNICAL
							<br />
							CAPABILITIES.
						</h2>
						<p className="text-text-muted font-sans text-lg">
							A non-exhaustive briefing of the technologies and paradigms
							utilized in the engineering of high-stakes sovereign intelligence
							systems.
						</p>
					</div>
				</FadeInView>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-border-subtle">
					{skillGroups.map((group: SkillGroupsProps, gi: number) => {
						const isPrimary = group.accent === "primary";
						const accent = isPrimary ? "text-accent" : "text-accent-warm";

						return (
							<FadeInView key={group.category} delay={gi * 0.08}>
								<motion.div
									className={`bg-surface-low px-8 py-10 border-l-4 ${isPrimary ? "border-accent" : "border-accent-warm"} cursor-default min-h-48 transition-colors duration-300`}
									whileHover={{
										backgroundColor: "var(--surface-container)",
									}}
								>
									<div className="flex justify-between items-start mb-6">
										<h3 className={`font-mono text-lg ${accent}`}>
											{"//"}
											{group.category}
										</h3>
										<span className="text-xl text-text-dim opacity-[0.5]">
											{group.icon}
										</span>
									</div>
									<motion.div
										variants={containerV}
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true }}
										className="flex flex-wrap gap-2.5"
									>
										{group.items.map((skill) => (
											<motion.span
												key={skill}
												variants={itemV}
												whileHover={{
													borderColor: isPrimary ? "var(--accent)" : "var(--accent-warm)",
													scale: 1.04,
												}}
												className={`px-3 py-1 bg-surface-highest font-mono text-[11px] border border-border ${accent}`}
											>
												{skill}
											</motion.span>
										))}
									</motion.div>
								</motion.div>
							</FadeInView>
						);
					})}
				</div>
				<FadeInView delay={0.3}>
					<div className="mt-12 border border-border-subtle px-5 py-6 flex justify-between items-center bg-bg flex-wrap gap-4">
						<div className="flex items-center gap-3">
							<motion.div
								aria-hidden="true"
								className="w-2.5 h-2.5 bg-accent"
								animate={{ opacity: [1, 0.3, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
							/>
							<span className="font-mono text-xs text-text-muted">
								SYSTEM_READY: CONTINUOUS_INTEGRATION_ACTIVE
							</span>
						</div>
						<span className="font-mono text-xs text-accent">
							{(() => {
								const raw = import.meta.env.VITE_DEPLOYED_AT;
								if (!raw) return "LAST_DEPLOYED: UNKNOWN";

								const d = new Date(raw);
								const pad = (n: number) => String(n).padStart(2, "0");

								return `LAST_DEPLOYED: ${d.getUTCFullYear()}.${pad(
									d.getUTCMonth() + 1,
								)}.${pad(d.getUTCDate())}_${pad(d.getUTCHours())}:${pad(
									d.getUTCMinutes(),
								)}_UTC`;
							})()}
						</span>
					</div>
				</FadeInView>
			</div>
		</section>
	);
};

export default Skills;
