import { motion } from "motion/react";
import FadeInView from "@/components/animation/FadeInView";
import type { AboutProps } from "@/interfaces/ComponentProps";
import type { ExperiencesProps } from "@/interfaces/DataProps";
import SectionLabel from "@/ui/SectionLabel";
import renderBulletWithLinks from "@/utils/renderBulletsWithLinks";

const profileSpecs = [
	{ key: "Degree", value: "M.Sc. Computer Science (NTNU)" },
	{ key: "Current", value: "Hoggorm Design A/S" },
	{ key: "Focus", value: "Full-Stack · AI/ML · IR" },
];

const About = ({ experiences, education }: AboutProps) => {
	const sortedExperiences = [...experiences].sort((a, b) =>
		b.startDate.localeCompare(a.startDate),
	);

	return (
		<section
			id="about"
			className="py-24 px-6 relative z-10 border-b border-border"
		>
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="01" label="About" />
				</FadeInView>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
					{/* Left Sticky Editorial Bio + Spec Ledger */}
					<FadeInView direction="left" className="lg:col-span-5">
						<article className="lg:sticky lg:top-24">
							<h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-[1.15] tracking-tight mb-6">
								Building practical software with strong engineering fundamentals.
							</h2>
							<div className="flex flex-col gap-4 text-text-muted font-body leading-relaxed text-base sm:text-lg mb-8">
								<p>
									I'm a Computer Science student at NTNU with a passion for
									building software that matters. From information retrieval to
									machine learning pipelines, I enjoy tackling complex problems
									with clean, maintainable code.
								</p>
								<p>
									Currently working as a Software Engineer at Hoggorm Design
									A/S, shipping production applications that handle real
									traffic. I recently interned in AI/ML at Kongsberg Defence
									&amp; Aerospace working on computer vision anomaly detection.
								</p>
							</div>

							{/* Profile Spec Table */}
							<dl className="border-t border-border divide-y divide-border-subtle text-sm">
								{profileSpecs.map((row) => (
									<div
										key={row.key}
										className="py-3.5 flex items-baseline justify-between gap-4"
									>
										<dt className="font-mono text-xs uppercase tracking-wider text-text-dim">
											{row.key}
										</dt>
										<dd className="text-text-primary text-right font-medium font-body">
											{row.value}
										</dd>
									</div>
								))}
							</dl>
						</article>
					</FadeInView>

					{/* Right Column: Connected Timeline + Education Ledger */}
					<div className="lg:col-span-7 flex flex-col gap-16">
						{/* Work Experience Connected Vertical Timeline */}
						<div>
							<div className="flex items-center justify-between mb-8">
								<h3 className="font-display text-xl font-bold text-text-primary flex items-center gap-2.5">
									<span className="w-2.5 h-2.5 bg-accent inline-block rounded-xs" />
									<span>Work Experience</span>
								</h3>
								<span className="font-mono text-xs text-text-dim tabular-nums">
									{sortedExperiences.length} roles
								</span>
							</div>

							<div className="relative pl-6 sm:pl-8 space-y-10">
								{/* Animated vertical timeline rail */}
								<motion.div
									aria-hidden="true"
									className="absolute left-0 top-1.5 bottom-2 w-px bg-border origin-top"
									initial={{ scaleY: 0 }}
									whileInView={{ scaleY: 1 }}
									viewport={{ once: true, margin: "-60px" }}
									transition={{ duration: 0.7, ease: "easeOut" }}
								/>

								{sortedExperiences.map((exp: ExperiencesProps, i: number) => {
									const isCurrent = !exp.endDate;
									return (
										<motion.article
											key={`${exp.company}-${exp.role}-${exp.period}`}
											initial={{ opacity: 0, x: 18 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true, margin: "-40px" }}
											transition={{
												delay: i * 0.08,
												duration: 0.45,
												ease: "easeOut",
											}}
											whileHover={{ x: 4 }}
											className="relative group"
										>
											{/* Timeline Node */}
											<span
												aria-hidden="true"
												className={`absolute -left-[29px] sm:-left-[37px] top-1.5 w-2.5 h-2.5 border transition-all duration-200 ${
													isCurrent
														? "bg-accent border-accent scale-110"
														: "bg-bg border-accent/70 group-hover:bg-accent group-hover:scale-110"
												}`}
											/>

											<div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
												<h4 className="font-display font-semibold text-xl text-text-primary group-hover:text-accent transition-colors">
													{exp.role}
												</h4>
												<time
													className="font-mono text-xs text-text-dim tabular-nums"
													dateTime={exp.startDate}
												>
													{exp.period}
												</time>
											</div>

											<div className="font-body text-sm text-accent font-semibold mb-3.5 flex items-center gap-2.5">
												<span>{exp.company}</span>
												{isCurrent && (
													<span className="font-mono text-[11px] px-2 py-0.5 rounded-xs bg-accent/12 text-accent uppercase tracking-wider">
														Current
													</span>
												)}
											</div>

											<ul className="space-y-2 border-t border-border-subtle pt-3">
												{exp.bullets.map((bullet) => (
													<li
														key={`${exp.company}-${exp.role}-${bullet}`}
														className="text-sm sm:text-base text-text-muted leading-relaxed flex items-start gap-2.5"
													>
														<span
															className="font-mono text-accent/80 shrink-0 mt-0.5"
															aria-hidden="true"
														>
															—
														</span>
														<span>{renderBulletWithLinks(bullet)}</span>
													</li>
												))}
											</ul>
										</motion.article>
									);
								})}
							</div>
						</div>

						{/* Education: Distinct 2-Column Architectural Ledger */}
						<div>
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-display text-xl font-bold text-text-primary flex items-center gap-2.5">
									<span className="w-2.5 h-2.5 bg-accent-warm inline-block rounded-xs" />
									<span>Education</span>
								</h3>
								<span className="font-mono text-xs text-text-dim">NTNU</span>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								{education.map((edu, i) => (
									<motion.article
										key={edu.degree}
										initial={{ opacity: 0, y: 18 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-40px" }}
										transition={{ delay: i * 0.1, duration: 0.45 }}
										whileHover={{ y: -4 }}
										className="p-6 bg-surface border border-border border-t-2 border-t-accent-warm rounded-md flex flex-col justify-between transition-shadow hover:shadow-md"
									>
										<div>
											<div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-text-dim tabular-nums">
												<span>{edu.institution}</span>
												<time dateTime={edu.period}>{edu.period}</time>
											</div>
											<h4 className="font-display font-semibold text-lg text-text-primary mb-3.5">
												{edu.degree}
											</h4>
											<ul className="space-y-2">
												{edu.bullets.map((bullet) => (
													<li
														key={bullet}
														className="text-sm text-text-muted leading-relaxed flex items-start gap-2"
													>
														<span
															className="text-accent-warm-dim dark:text-accent-warm shrink-0 font-mono font-bold"
															aria-hidden="true"
														>
															+
														</span>
														<span>{bullet}</span>
													</li>
												))}
											</ul>
										</div>
									</motion.article>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
