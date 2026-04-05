import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { z } from "zod";
import FadeInView from "@/components/animation/FadeInView";
import { SectionLabel } from "@/components/Homepage";
import { useAppForm } from "@/lib/form";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const contactSchema = z.object({
	name: z.string().min(4, "Name must be at least 4 characters"),
	email: z.email("Invalid email address"),
	message: z
		.string()
		.trim()
		.min(20, "Message must be at least 20 characters")
		.max(1000, "Message must be less than 1000 characters")
		.refine(
			(value) => value.replace(/\s/g, "").length >= 20,
			"Message must contain at least 20 non-space characters",
		),
});

const Contact = () => {
	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
		onSubmit: async ({ value }) => {
			await emailjs.send(
				SERVICE_ID,
				TEMPLATE_ID,
				{
					name: value.name,
					email: value.email,
					message: value.message,
					time: Date().toLocaleLowerCase(),
				},
				PUBLIC_KEY,
			);
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
					<h2 className="text-4xl md:text-6xl font-display text-text-primary">
						LET'S BUILD <br /> SOMETHING
					</h2>
				</FadeInView>
				<FadeInView>
					<p className="text-text-muted font-body">
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
									className="bg-accent text-bg font-mono text-sm font-bold px-7 py-3 cursor-pointer mt-8 disabled:opacity-50 disabled:cursor-not-allowed "
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
