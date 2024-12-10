import { Icon } from 'astro-icon/components';
import { motion } from 'framer-motion';

const Contact = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="py-12"
		>
			<h2 className="mb-8 text-center text-3xl font-bold">Contact Me</h2>
			<div className="mx-auto max-w-3xl">
				<form className="space-y-6">
					<div role="group">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div role="group">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div role="group">
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							rows={4}
							required
							aria-label="message-text-area"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						></textarea>
					</div>
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Send Message
						</button>
					</div>
				</form>
				<div className="mt-12 flex justify-center space-x-6">
					<a href="tel:+4798769538" aria-label="contact-phone">
						{/*<Icon*/}
						{/*	name="phone-icon"*/}
						{/*	size={40}*/}
						{/*	class="text-gray-600 transition-colors duration-300 hover:text-indigo-600"*/}
						{/*/>*/}
					</a>
					<a href="mailto:christopher.hoee@gmail.com" aria-label="contact-mail">
						{/* <Icon
							name="mail-icon"
							size={40}
							class="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
						/> */}
					</a>
					<a
						href="https://github.com/Christio02"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="contact-github"
					>
						{/*<Icon*/}
						{/*	name="github-icon"*/}
						{/*	size={40}*/}
						{/*	class="text-gray-600 transition-colors duration-300 hover:text-indigo-600"*/}
						{/*/>*/}
					</a>
					<a
						href="https://www.linkedin.com/in/christopher-h%C3%B8e-3b7924257/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="contact-linkedin"
					>
						{/*<Icon*/}
						{/*	name="linkedin-icon"*/}
						{/*	size={40}*/}
						{/*	class="text-gray-600 transition-colors duration-300 hover:text-indigo-600"*/}
						{/*/>*/}
					</a>
				</div>
			</div>
		</motion.section>
	);
};

export default Contact;
