export const slugifyLink = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // keep  spaces and hyphens
		.replace(/\s+/g, '-') // replaces spaces with hyphens
		.replace(/-+/g, '-') // replace consecutive hyphens with single hyphen
		.replace(/^-|-$/g, ''); // remove leading/trailing hyphens
};
