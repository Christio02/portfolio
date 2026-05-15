import { z } from "zod";

export const contactSchema = z.object({
	name: z
		.string()
		.min(4, "Name must be at least 4 characters")
		.max(100, "Name must be less than 100 characters")
		.refine((val) => !val.match(/[\r\n]/), "Name cannot contain line breaks"),
	email: z
		.string()
		.email("Invalid email address")
		.max(255, "Email must be less than 255 characters")
		.refine((val) => !val.match(/[\r\n]/), "Email cannot contain line breaks")
		.refine((val) => !val.match(/[<>]/), "Email cannot contain angle brackets"),
	message: z
		.string()
		.trim()
		.min(20, "Message must be at least 20 characters")
		.max(1000, "Message must be less than 1000 characters")
		.superRefine((value, ctx) => {
			if (value.replace(/\s/g, "").length < 20) {
				ctx.addIssue({
					code: "custom",
					message: "Message must contain at least 20 non-space characters",
				});
			}
		}),
});

export type ContactSchema = z.infer<typeof contactSchema>;
