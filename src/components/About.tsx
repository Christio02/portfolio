import { motion } from "motion/react";
import FadeInView from "@/components/animation/FadeInView";
import type { AboutProps } from "@/interfaces/ComponentProps";
import type { ExperiencesProps } from "@/interfaces/DataProps";
import { SectionLabel } from "./Homepage";

const About = ({ experiences, education }: AboutProps) => {
	return (
		<section id="about" className="py-24 px-6 relative z-1">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="01" label="ABOUT" />
				</FadeInView>
				<div className="grid grid-cols-1 gap-16 sm:grid-cols-2 ">
					<FadeInView direction="left">
						<article>
							<h2 className="font-display text-text-primary text-4xl md:text-5xl font-extrabold leading-tight mb-6">
								BUILDING
								<br />
								THE FUTURE.
							</h2>
							<div className="flex flex-col gap-6">
								<p className="font-body text-text-muted leading-relaxed">
									I'm a third-year Computer Science student at NTNU with a
									passion for building software that matters. From distributed
									systems to data mining and machine learning pipelines, I enjoy
									tackling complex problems with clean, maintainable code.
								</p>
								<p className="font-body text-text-muted leading-relaxed">
									Currently engineering scalable web applications at Hoggorm
									Design, where I've shipped production systems that handle real
									traffic and real users. I believe great software is equal
									parts technical rigor and human empathy.
								</p>
							</div>
						</article>
					</FadeInView>
					<FadeInView direction="right" delay={0.15}>
						<div>
							<h3 className="font-mono text-sm text-accent mb-7 uppercase">
								{"//"} experiences.log
							</h3>
							<div className="flex flex-col">
								{experiences.map((exp: ExperiencesProps, i: number) => (
									<motion.article
										key={`${exp.company}-${exp.role}-${exp.period}`}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1, duration: 0.5 }}
										className={`border-l-2 pl-6 relative ${i === 0 ? "border-accent" : "border-border"} pb-8 last:pb-0`}
									>
										<div
											aria-hidden="true"
											style={{
												position: "absolute",
												left: -5,
												top: 4,
												width: 8,
												height: 8,
												background:
													i === 0 ? "var(--accent)" : "var(--surface-highest)",
												border: `2px solid ${i === 0 ? "var(--accent)" : "var(--border)"}`,
											}}
										/>

										<div className="text-text-primary">{exp.role}</div>
										<div className="text-accent">{exp.company}</div>
										<time className="text-text-dim block" dateTime={exp.period}>{exp.period}</time>

										{exp.bullets.map((bullet) => (
											<div
												key={`${exp.company}-${exp.role}-${exp.period}-${bullet}`}
												className="relative pl-3 text-sm leading-relaxed text-text-muted"
											>
												<span className="absolute left-0 text-text-dim">-</span>
												{bullet}
											</div>
										))}
									</motion.article>
								))}
							</div>
						</div>
						<div className="mt-8">
							<h3 className="font-mono text-sm text-accent-warm mb-7 uppercase">
								{"//"} education.log
							</h3>
							<div className="flex flex-col">
								{education.map((education, i) => (
									<motion.article
										key={education.degree}
										className=" border-l-2 border-accent-warm px-6 py-5 pl-6 relative flex flex-col pb-8 last:pb-0"
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1, duration: 0.5 }}
									>
										<div
											aria-hidden="true"
											style={{
												position: "absolute",
												left: -5,
												top: 4,
												width: 8,
												height: 8,
												background:
													i === 0
														? "var(--accent-warm)"
														: "var(--surface-highest)",
												border: `2px solid ${i === 0 ? "var(--accent-warm)" : "var(--border)"}`,
											}}
										/>
										<div className="font-display">{education.degree}</div>
										<div className="font-mono text-accent-warm">
											{education.institution}
										</div>
										<time className="font-mono text-text-dim text-xs block" dateTime={education.period}>
											{education.period}
										</time>
										{education.bullets.map((bullet) => (
											<div
												key={bullet}
												className="relative pl-3 text-sm leading-relaxed text-text-muted"
											>
												<span className="absolute left-0 text-text-dim">-</span>
												{bullet}
											</div>
										))}
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
