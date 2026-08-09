import { SocialLinks } from "@/data/data";

export default function Footer() {
	return (
		<footer className="mt-20 border-t border-border-subtle py-12">
			<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
				<div className="font-body text-sm text-text-dim">
					© {new Date().getFullYear()} Christopher Gulbrandsen Høe. Built with
					React &amp; Cloudflare Workers.
				</div>

				<div className="flex items-center gap-6">
					{SocialLinks.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							aria-label={`${social.name} (opens in new tab)`}
							className="font-body text-sm font-medium text-text-muted hover:text-accent transition-colors"
							rel="noopener noreferrer"
						>
							{social.name}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
