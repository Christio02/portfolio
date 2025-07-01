export const slugifyLink = (name: string) => {
	return name.toLowerCase().replaceAll(' ', '-');
};
