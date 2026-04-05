import { SocialLinks } from "@/data/data";

export default function Footer() {
	return (
		<footer className="mt-20 flex justify-between items-center flex-wrap gap-24 max-w-6xl mx-auto px-6 m-0 border-t border-border-subtle py-20 max-[835px]:flex-col max-[835px]:items-center max-[835px]:gap-8">
			<div className="w-full text-center md:w-auto md:text-left">
				<span className="font-mono uppercase text-text-dim">
					© 2026 Christopher Høe
				</span>
			</div>

			<div className="flex gap-12 md:gap-48 items-center justify-center max-[835px]:w-full max-[835px]:justify-center">
				{SocialLinks.map((social) => (
					<a
						key={social.name}
						href={social.url}
						target="_blank"
						aria-label={`${social.name} (opens in new tab)`}
						className="font-mono uppercase text-text-dim hover:text-accent-warm transition-colors"
						rel="noopener noreferrer"
					>
						{social.name}
					</a>
				))}
			</div>
		</footer>
	);
}
