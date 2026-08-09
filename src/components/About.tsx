import { motion } from "motion/react";
import FadeInView from "@/components/animation/FadeInView";
import type { AboutProps } from "@/interfaces/ComponentProps";
import type { ExperiencesProps } from "@/interfaces/DataProps";
import SectionLabel from "@/ui/SectionLabel";

const About = ({ experiences, education }: AboutProps) => {
	return (
		<section id="about" className="py-24 px-6 relative z-10">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="01" label="About Me" />
				</FadeInView>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
					<FadeInView direction="left" className="lg:col-span-5">
						<article className="sticky top-28">
							<h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
								Engineering software with technical rigor &amp; user focus.
							</h2>
							<div className="flex flex-col gap-5 text-text-muted font-body leading-relaxed text-base">
								<p>
									I'm a Computer Science student at NTNU with a passion for
									building software that matters. From distributed systems to
									machine learning pipelines, I enjoy tackling complex problems
									with clean, maintainable code.
								</p>
								<p>
									Currently engineering scalable web applications at Hoggorm
									Design, shipping production systems that handle real traffic
									and real users. I believe great software combines technical
									depth with thoughtful design.
								</p>
							</div>
						</article>
					</FadeInView>

					<FadeInView
						direction="right"
						delay={0.15}
						className="lg:col-span-7 flex flex-col gap-12"
					>
						<div>
							<h3 className="font-display text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-accent" />
								Work Experience
							</h3>
							<div className="flex flex-col gap-4">
								{experiences.map((exp: ExperiencesProps, i: number) => (
									<motion.article
										key={`${exp.company}-${exp.role}-${exp.period}`}
										initial={{ opacity: 0, y: 16 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.08, duration: 0.4 }}
										className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all shadow-sm group"
									>
										<div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
											<h4 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent transition-colors">
												{exp.role}
											</h4>
											<time
												className="font-mono text-xs text-text-dim px-2.5 py-0.5 rounded-full bg-surface-low border border-border-subtle"
												dateTime={exp.period}
											>
												{exp.period}
											</time>
										</div>
										<div className="text-accent font-medium text-sm mb-4">
											{exp.company}
										</div>

										<ul className="flex flex-col gap-2">
											{exp.bullets.map((bullet) => (
												<li
													key={`${exp.company}-${exp.role}-${bullet}`}
													className="text-sm text-text-muted leading-relaxed flex items-start gap-2"
												>
													<span className="text-accent shrink-0 mt-1">•</span>
													<span>{bullet}</span>
												</li>
											))}
										</ul>
									</motion.article>
								))}
							</div>
						</div>

						<div>
							<h3 className="font-display text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-accent-warm" />
								Education
							</h3>
							<div className="flex flex-col gap-4">
								{education.map((edu, i) => (
									<motion.article
										key={edu.degree}
										initial={{ opacity: 0, y: 16 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.08, duration: 0.4 }}
										className="p-6 rounded-2xl bg-surface border border-border hover:border-accent-warm/40 transition-all shadow-sm group"
									>
										<div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
											<h4 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent-warm transition-colors">
												{edu.degree}
											</h4>
											<time
												className="font-mono text-xs text-text-dim px-2.5 py-0.5 rounded-full bg-surface-low border border-border-subtle"
												dateTime={edu.period}
											>
												{edu.period}
											</time>
										</div>
										<div className="text-accent-warm font-medium text-sm mb-4">
											{edu.institution}
										</div>

										<ul className="flex flex-col gap-2">
											{edu.bullets.map((bullet) => (
												<li
													key={bullet}
													className="text-sm text-text-muted leading-relaxed flex items-start gap-2"
												>
													<span className="text-accent-warm shrink-0 mt-1">
														•
													</span>
													<span>{bullet}</span>
												</li>
											))}
										</ul>
									</motion.article>
								))}
							</div>
						</div>
					</FadeInView>
				</div>
			</div>
		</section>
	);
};

export default About;
