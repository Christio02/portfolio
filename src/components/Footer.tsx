import { ArrowUp } from "lucide-react";
import { SocialLinks } from "@/data/data";

export default function Footer() {
	return (
		<footer className="border-t border-border py-10 px-6 bg-bg">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
				<div className="text-text-muted font-body flex flex-wrap items-center justify-center md:justify-start gap-2">
					<span className="text-text-primary font-medium">
						© {new Date().getFullYear()} Christopher Gulbrandsen Høe
					</span>
					<span className="text-text-dim" aria-hidden="true">
						·
					</span>
					<span>Built with TanStack Start</span>
				</div>

				<div className="flex items-center gap-6 font-body font-medium">
					{SocialLinks.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							aria-label={`${social.name} (opens in new tab)`}
							className="text-text-muted hover:text-accent transition-colors"
							rel="noopener noreferrer"
						>
							{social.name}
						</a>
					))}
					<a
						href="#hero"
						aria-label="Back to top"
						className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors pl-4 border-l border-border"
					>
						<ArrowUp size={15} />
						<span>Top</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
