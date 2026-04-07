export const seo = ({
	title,
	description,
	image,
	url,
}: {
	title: string;
	description?: string;
	image?: string;
	url?: string;
}) => {
	const tags = [
		{ title },
		...(description ? [{ name: "description", content: description }] : []),
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: title },
		...(description
			? [{ property: "og:description", content: description }]
			: []),
		...(url ? [{ property: "og:url", content: url }] : []),
		...(image ? [{ property: "og:image", content: image }] : []),
		{
			name: "twitter:card",
			content: image ? "summary_large_image" : "summary",
		},
		{ name: "twitter:title", content: title },
		...(description
			? [{ name: "twitter:description", content: description }]
			: []),
		...(image ? [{ name: "twitter:image", content: image }] : []),
	];
	return tags;
};
