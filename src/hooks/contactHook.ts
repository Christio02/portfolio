import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "@/interfaces/contactSchema";

/**
 * Sanitize input to prevent header injection and HTML entity attacks
 * Escapes special characters that could break email headers or cause injection
 */
const sanitizeInput = (str: string): string => {
	return str
		.replace(/[\r\n]/g, " ") // Remove line breaks (prevent header injection)
		.replace(/&/g, "&amp;") // HTML entities
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/\//g, "&#x2F;");
};

export const submitContactFormFn = createServerFn({
	method: "POST",
})
	.inputValidator(contactSchema)
	.handler(async ({ data }) => {
		// Sanitize all inputs to prevent injection attacks
		const sanitizedName = sanitizeInput(data.name);
		const sanitizedEmail = sanitizeInput(data.email);
		const sanitizedMessage = sanitizeInput(data.message);

		// Validate email doesn't contain suspicious patterns after sanitization
		if (!sanitizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			throw new Error("Invalid email format");
		}

		const response = await fetch(
			"https://api.emailjs.com/api/v1.0/email/send",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					service_id: process.env.EMAILJS_SERVICE_ID,
					template_id: process.env.EMAILJS_TEMPLATE_ID,
					user_id: process.env.EMAILJS_PUBLIC_KEY,
					accessToken: process.env.EMAILJS_PRIVATE_KEY,
					template_params: {
						name: sanitizedName,
						email: sanitizedEmail,
						message: sanitizedMessage,
						time: new Date().toISOString(),
					},
				}),
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("EmailJS Error:", errorText);
			throw new Error("Failed to send email");
		}

		return { success: true };
	});
