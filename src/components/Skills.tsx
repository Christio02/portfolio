import { motion } from "motion/react";
import FadeInView from "@/components/animation/FadeInView";
import { skillGroups } from "@/data/data";
import type { SkillGroupsProps } from "@/interfaces/DataProps";
import SectionLabel from "@/ui/SectionLabel";

const Skills = () => {
	const containerV = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.04 } },
	};

	const itemV = {
		hidden: { opacity: 0, y: 8 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
	};

	return (
		<section id="skills" className="py-24 px-6 relative z-10">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="02" label="Capabilities" />
				</FadeInView>
				<FadeInView>
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
						<div>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
								Technical Stack
							</h2>
						</div>
						<p className="text-text-muted font-body text-base max-w-lg leading-relaxed">
							Technologies and frameworks I work with across distributed
							systems, full-stack web development, data mining, and machine
							learning.
						</p>
					</div>
				</FadeInView>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{skillGroups.map((group: SkillGroupsProps, gi: number) => {
						const isPrimary = group.accent === "primary";
						const IconComponent = group.icon;

						return (
							<FadeInView key={group.category} delay={gi * 0.08}>
								<div className="p-8 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all shadow-sm h-full flex flex-col justify-between group">
									<div>
										<div className="flex justify-between items-center mb-6">
											<h3 className="font-display text-xl font-bold text-text-primary capitalize flex items-center gap-2">
												{group.category.replace("_", " ")}
											</h3>
											<div
												className={`p-2.5 rounded-xl ${isPrimary ? "bg-accent/10 text-accent" : "bg-accent-warm/10 text-accent-warm"}`}
											>
												<IconComponent size={20} />
											</div>
										</div>
										<motion.div
											variants={containerV}
											initial="hidden"
											whileInView="visible"
											viewport={{ once: true }}
											className="flex flex-wrap gap-2"
										>
											{group.items.map((skill) => (
												<motion.span
													key={skill}
													variants={itemV}
													whileHover={{ y: -2 }}
													className="px-3 py-1.5 rounded-lg bg-surface-low text-text-primary font-body text-xs font-medium border border-border-subtle hover:border-accent/30 transition-all"
												>
													{skill}
												</motion.span>
											))}
										</motion.div>
									</div>
								</div>
							</FadeInView>
						);
					})}
				</div>

				<FadeInView delay={0.3}>
					<div className="mt-8 px-6 py-4 rounded-xl border border-border-subtle bg-surface-low flex justify-between items-center flex-wrap gap-4 text-xs font-mono">
						<div className="flex items-center gap-2.5 text-text-muted">
							<span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
							<span>Continuous Integration Active</span>
						</div>
						<span className="text-text-dim">
							{(() => {
								const raw = import.meta.env.VITE_DEPLOYED_AT;
								if (!raw) return "Last Deployed: Unknown";

								const d = new Date(raw);
								const pad = (n: number) => String(n).padStart(2, "0");

								const tzName =
									Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
										.formatToParts(d)
										.find((part) => part.type === "timeZoneName")?.value ||
									"LOCAL";

								return `Last Deployed: ${d.getFullYear()}.${pad(
									d.getMonth() + 1,
								)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(
									d.getMinutes(),
								)} (${tzName})`;
							})()}
						</span>
					</div>
				</FadeInView>
			</div>
		</section>
	);
};

export default Skills;
