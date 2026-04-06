import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => ({
			meta: [
				{ title: "Christopher Gulbrandsen Høe | Portfolio", charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				...seo({
					title: "Christopher Gulbrandsen Høe | Portfolio",
					description:
						"Christopher Gulbrandsen Høe's portfolio made with Tanstack Start",
				}),
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						name: "Christopher Gulbrandsen Høe",
						url: "https://christophergulhoe.dev",
						jobTitle: "Software Engineer",
						alumniOf: {
							"@type": "CollegeOrUniversity",
							name: "Norwegian University of Science and Technology (NTNU)",
							url: "https://www.ntnu.edu",
							department: "Computer Science",
						},
						affiliation: {
							"@type": "CollegeOrUniversity",
							name: "Norwegian University of Science and Technology (NTNU)",
							url: "https://www.ntnu.edu",
						},
						knowsAbout: ["React", "TypeScript", "Distributed systems", ".NET"],
						description:
							"Computer Science student at NTNU and Software Engineer at Hoggorm Design, specializing in full-stack web development, distributed systems, and data mining/ML. Building production-grade applications with React, TypeScript, .NET, and CI/CD.",
						sameAs: [
							"https://github.com/Christio02",
							"https://www.linkedin.com/in/christopher-gulbrandsen-høe",
						],
					}),
				},
			],
			links: [
				{ rel: "stylesheet", href: appCss },
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png?v=2",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-dark.png?v=3",
					media: "(prefers-color-scheme: dark)",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png?v=3",
					media: "(prefers-color-scheme: light)",
				},

				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Syne:wght@800&family=JetBrains+Mono:wght@400;500;700&family=DM+Sans:wght@400;500&display=swap",
				},

				{ rel: "manifest", href: "/manifest.json?v=2", color: "#fffff" },
			],
		}),
		errorComponent: (props) => {
			return (
				<RootDocument>
					<DefaultCatchBoundary {...props} />
				</RootDocument>
			);
		},
		notFoundComponent: () => <NotFound />,
		component: RootComponent,
	},
);

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body suppressHydrationWarning>
				{children}
				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Scripts />
			</body>
		</html>
	);
}
