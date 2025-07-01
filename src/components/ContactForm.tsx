import { Button } from '@/components/ui/button';
import Header from '@/components/ui/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsSubmitting(false);
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="from-background to-secondary/20 bg-gradient-to-b px-4 py-12 sm:px-6 lg:px-8"
		>
			<div className="mx-auto max-w-3xl">
				<Header size="large" gradient="none" center marginBottom="large">
					Contact Me
				</Header>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" name="name" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" name="email" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="message">Message</Label>
						<Textarea id="message" name="message" rows={4} required />
					</div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</Button>
				</form>
			</div>
		</motion.section>
	);
};

export default ContactForm;
