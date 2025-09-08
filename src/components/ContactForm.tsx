import { Button } from '@/components/ui/button';
import Header from '@/components/ui/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm, useStore } from '@tanstack/react-form';
import { motion } from 'framer-motion';
import validator from 'validator';
import SubmitButton from './SubmitButton';

interface ContactForm {
	name: string;
	email: string;
	message: string;
}

const ContactForm = () => {
	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			message: ''
		} as ContactForm,
		onSubmitMeta: {} as ContactForm,
		onSubmit: async ({ value, meta }) => {
			console.log(`${value} - ${meta}`);
		}
	});

	// subscribe to form values
	const name = useStore(form.store, (state) => state.values.name);
	const email = useStore(form.store, (state) => state.values.email);
	const message = useStore(form.store, (state) => state.values.message);

	// track errors
	const errors = useStore(form.store, (state) => state.errorMap);

	const validateName = (name: string) => {
		if (typeof name !== 'string') {
			return false;
		}

		const trimmedName = name.trim();

		if (trimmedName.length === 0) {
			return false;
		}

		const nameParts = name.split(/\s+/);

		if (nameParts.length < 2) {
			return false; // must have at least two words
		}

		const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/;

		for (const part of nameParts) {
			if (!nameRegex.test(part)) {
				return false; // invalid character
			}
		}

		return true;
	};

	const validateEmail = (email: string): boolean => validator.isEmail(email);

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="from-background to-secondary/20 bg-gradient-to-b px-4 py-12 sm:px-6 lg:px-8"
		>
			<div className="mx-auto max-w-3xl">
				<h2 className="mb-8 text-center text-3xl font-bold">Contact Me</h2>
				<form.Field
					name="name"
					validators={{
						onBlur: ({ value }) =>
							!value ? 'A name is required!' : !validateName(value) ? 'Name not valid!' : undefined
					}}
					children={(field) => (
						<>
							<div className="space-y-2">
								<Label htmlFor={field.name}>Name</Label>
								<Input
									id={field.name}
									name={field.name}
									required
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur} // listen on blur to validate
								/>
								{field.state.meta.errors ? (
									<em role="alert">{field.state.meta.errors.join(', ')}</em>
								) : null}
							</div>
						</>
					)}
				/>
				<form.Field
					name="email"
					validators={{
						onBlur: ({ value }) =>
							!value
								? 'An email is required!'
								: !validateEmail(value)
									? 'Invalid email!'
									: undefined
					}}
					children={(field) => (
						<>
							<div className="space-y-2">
								<Label htmlFor={field.name}>Email</Label>
								<Input
									id={field.name}
									name={field.name}
									required
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								{field.state.meta.errors ? (
									<em role="alert">{field.state.meta.errors.join(', ')}</em>
								) : null}
							</div>
						</>
					)}
				/>
				<form.Field
					name="message"
					validators={{
						onBlur: ({ value }) =>
							!value
								? 'A message is required!'
								: value.length < 10
									? 'Message is too short!'
									: undefined
					}}
					children={(field) => (
						<>
							<div className="space-y-2">
								<Label htmlFor={field.name}>Message</Label>
								<Textarea
									id={field.name}
									name={field.name}
									rows={4}
									required
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								{field.state.meta.errors ? (
									<em role="alert">{field.state.meta.errors.join(', ')}</em>
								) : null}
							</div>
						</>
					)}
				/>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<div className="mt-6 flex justify-center">
							<SubmitButton isSubmitting={isSubmitting} canSubmit={canSubmit} />
						</div>
					)}
				/>
			</div>
		</motion.section>
	);
};

export default ContactForm;
