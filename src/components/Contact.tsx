import { Send } from "lucide-react";
import { motion } from "motion/react";
import { contactSchema } from "#/interfaces/contactSchema.ts";
import FadeInView from "@/components/animation/FadeInView";
import { submitContactFormFn } from "@/hooks/contactHook";
import { useAppForm } from "@/lib/form";
import SectionLabel from "@/ui/SectionLabel";

const Contact = () => {
	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
		onSubmit: async ({ value }) => {
			await submitContactFormFn({ data: value });
		},
		validators: {
			onChange: contactSchema,
		},
	});

	return (
		<section id="contact" className="py-24 px-6 relative z-10">
			<div className="max-w-4xl mx-auto">
				<FadeInView>
					<SectionLabel index="04" label="Contact" />
				</FadeInView>
				<FadeInView>
					<div className="mb-10">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight mb-4">
							Let's Work Together
						</h2>
						<p className="text-text-muted font-body text-base max-w-lg leading-relaxed">
							Have a project in mind or want to talk about software engineering,
							distributed systems, or AI? Send me a message below.
						</p>
					</div>
				</FadeInView>

				<FadeInView delay={0.15}>
					<div className="p-8 sm:p-10 rounded-2xl bg-surface border border-border shadow-sm">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
						>
							<div className="flex flex-col gap-6">
								<form.AppField name="name">
									{(field) => <field.TextField label="Your Name" />}
								</form.AppField>
								<form.AppField name="email">
									{(field) => <field.TextField label="Email Address" />}
								</form.AppField>
								<form.AppField name="message">
									{(field) => <field.TextArea label="Message" />}
								</form.AppField>
							</div>
							<form.Subscribe>
								{(state) => (
									<motion.button
										type="submit"
										disabled={!state.canSubmit || state.isSubmitting}
										className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim text-white font-medium text-sm px-8 py-3.5 rounded-xl cursor-pointer mt-8 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-accent/20 transition-all"
										whileHover={{ scale: 1.02, y: -2 }}
										whileTap={{ scale: 0.98 }}
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
		</section>
	);
};

export default Contact;
