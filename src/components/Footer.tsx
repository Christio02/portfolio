export default function Footer() {
	return (
		<footer className="mt-20 flex justify-between items-center flex-wrap gap-24 max-w-6xl mx-auto px-6 m-0 border-t border-border-subtle py-20">
			<span className="font-mono uppercase text-text-dim">© 2025 C.HOE</span>
			<div className="flex gap-32">
				{["GITHUB", "LINKEDIN", "SOURCE"].map((link) => (
					<a
						key={link}
						href="#"
						target="_blank"
						className="font-mono uppercase text-text-dim hover:text-accent-warm transition-colors"
						rel="noopener"
					>
						{link}
					</a>
				))}
			</div>
		</footer>
	);
}
