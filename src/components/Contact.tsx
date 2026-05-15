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
		<section id="contact" className="py-24 px-6">
			<div className="max-w-6xl mx-auto">
				<FadeInView>
					<SectionLabel index="04" label="CONTACT" />
				</FadeInView>
				<FadeInView>
					<h2 className="text-3xl md:text-5xl font-display text-text-primary">
						LET'S BUILD <br /> SOMETHING
					</h2>
				</FadeInView>
				<FadeInView>
					<p className="text-text-muted font-body mt-3">
						Have a project in mind? Send me a message and I'll get back to you
						soon.
					</p>
				</FadeInView>
				<FadeInView delay={0.2}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className="mt-8"
					>
						<div className="flex flex-col gap-8">
							<form.AppField name="name">
								{(field) => <field.TextField label="Name" />}
							</form.AppField>
							<form.AppField name="email">
								{(field) => <field.TextField label="Email" />}
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
									className="bg-accent text-bg font-mono text-sm font-bold px-7 py-3 cursor-pointer mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
									whileHover={{ scale: 1.03, y: -2 }}
									whileTap={{ scale: 0.97 }}
								>
									{state.isSubmitting ? "Sending..." : "Send Message"}
								</motion.button>
							)}
						</form.Subscribe>
					</form>
				</FadeInView>
			</div>
		</section>
	);
};

export default Contact;
