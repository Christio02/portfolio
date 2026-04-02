import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	const [scrollBorder, setScrollBorder] = useState(false);

	useEffect(() => {
		const handler = () => {
			setScrollBorder(window.scrollY > 20);
		};

		window.addEventListener("scroll", handler);

		return () => window.removeEventListener("scroll", handler);
	}, []);

	const links = ["about", "skills", "projects", "contact"];

	return (
		<motion.header
			className={`sticky top-0 z-50 ${scrollBorder ? "border-b" : ""} bg-surface-container/80 border-border-subtle px-4 backdrop-blur-lg`}
			initial={{ y: -80 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div className="max-w-6xl mx-auto flex items-center justify-between h-16">
				<a href="#hero" className="font-mono text-accent">
					C.HOE_PORTFOLIO
				</a>
				<nav className="font-mono flex items-center text-sm uppercase text-text-muted tracking-wider no-underline gap-8">
					{links.map((link) => (
						<a
							key={link}
							href={`#${link}`}
							className="hover:text-accent transition-colors"
						>
							{link}
						</a>
					))}
				</nav>
				<ThemeToggle />
			</div>
		</motion.header>
	);
}
