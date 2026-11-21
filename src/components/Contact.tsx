import {
	AlertCircle,
	ArrowUpRight,
	CheckCircle2,
	Send,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { contactSchema } from "#/interfaces/contactSchema.ts";
import FadeInView from "@/components/animation/FadeInView";
import { SocialLinks } from "@/data/data";
import { submitContactFormFn } from "@/hooks/contactHook";
import { useAppForm } from "@/lib/form";
import SectionLabel from "@/ui/SectionLabel";

type SubmitStatus = "idle" | "success" | "error";

const Contact = () => {
	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
		onSubmit: async ({ value }) => {
			setSubmitStatus("idle");
			setErrorMessage("");
			try {
				await submitContactFormFn({ data: value });
				setSubmitStatus("success");
				form.reset();
			} catch (err) {
				setSubmitStatus("error");
				setErrorMessage(
					err instanceof Error
						? err.message
						: "Something went wrong. Please try again or reach out via LinkedIn.",
				);
			}
		},
		validators: {
			onChange: contactSchema,
		},
	});

	return (
		<section id="contact" className="py-24 px-6 relative z-10 bg-surface-low/45">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="04" label="Contact" />
				</FadeInView>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					{/* Left Column: Direct Channels */}
					<FadeInView direction="left" className="lg:col-span-5">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight leading-[1.08] mb-5">
							Let's Work Together
						</h2>
						<p className="text-text-muted font-body text-base sm:text-lg leading-relaxed mb-8">
							Have a project in mind, or want to talk about software
							engineering, information retrieval, or AI? Send a message or reach
							out directly.
						</p>

						<div className="border-t border-border divide-y divide-border-subtle text-sm">
							<div className="py-3.5 flex items-center justify-between">
								<span className="font-mono text-xs uppercase tracking-wider text-text-dim">
									Status
								</span>
								<span className="inline-flex items-center gap-2 text-text-primary font-medium">
									<span className="w-2 h-2 rounded-full bg-accent-warm inline-block" />
									<span>Open to collaborations</span>
								</span>
							</div>
							{SocialLinks.map((link) => (
								<a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="py-3.5 flex items-center justify-between text-text-muted hover:text-accent transition-colors group"
								>
									<span className="font-mono text-xs uppercase tracking-wider text-text-dim group-hover:text-accent transition-colors">
										{link.name}
									</span>
									<span className="inline-flex items-center gap-1.5 text-text-primary font-medium group-hover:text-accent transition-colors">
										<span>Open profile</span>
										<ArrowUpRight size={15} />
									</span>
								</a>
							))}
						</div>
					</FadeInView>

					{/* Right Column: Contact Form */}
					<FadeInView direction="right" delay={0.1} className="lg:col-span-7">
						<div className="p-7 sm:p-9 rounded-md bg-surface border border-border corner-ticks">
							<h3 className="font-display text-xl font-bold text-text-primary mb-6">
								Send a Message
							</h3>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit();
								}}
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
									<form.AppField name="name">
										{(field) => <field.TextField label="Your Name" />}
									</form.AppField>
									<form.AppField name="email">
										{(field) => <field.TextField label="Email Address" />}
									</form.AppField>
								</div>
								<div className="mb-6">
									<form.AppField name="message">
										{(field) => <field.TextArea label="Message" />}
									</form.AppField>
								</div>

								<AnimatePresence mode="wait">
									{submitStatus === "success" && (
										<motion.div
											key="success"
											initial={{ opacity: 0, y: -8 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -8 }}
											role="status"
											className="mb-6 p-4 rounded-md bg-accent-warm/12 border border-accent-warm/40 flex items-start gap-3"
										>
											<CheckCircle2
												size={18}
												className="text-accent-warm-dim dark:text-accent-warm shrink-0 mt-0.5"
											/>
											<div>
												<div className="font-body text-sm font-semibold text-text-primary">
													Message sent
												</div>
												<p className="text-text-muted text-sm mt-0.5">
													Thanks for reaching out—I'll get back to you soon.
												</p>
											</div>
										</motion.div>
									)}

									{submitStatus === "error" && (
										<motion.div
											key="error"
											initial={{ opacity: 0, y: -8 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -8 }}
											role="alert"
											className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/35 flex items-start gap-3"
										>
											<AlertCircle
												size={18}
												className="text-red-500 shrink-0 mt-0.5"
											/>
											<div>
												<div className="font-body text-sm font-semibold text-text-primary">
													Couldn't send message
												</div>
												<p className="text-text-muted text-sm mt-0.5">
													{errorMessage}
												</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>

								<form.Subscribe>
									{(state) => (
										<motion.button
											type="submit"
											disabled={!state.canSubmit || state.isSubmitting}
											whileHover={{ y: -2, scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											transition={{
												type: "spring",
												stiffness: 420,
												damping: 24,
											}}
											className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-dim text-accent-fg font-body font-semibold text-sm sm:text-base px-7 py-3.5 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
										>
											<span>
												{state.isSubmitting ? "Sending..." : "Send Message"}
											</span>
											<Send size={16} />
										</motion.button>
									)}
								</form.Subscribe>
							</form>
						</div>
					</FadeInView>
				</div>
			</div>
		</section>
	);
};

export default Contact;
