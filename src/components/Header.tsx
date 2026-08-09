import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
	{ id: "about", label: "About" },
	{ id: "skills", label: "Capabilities" },
	{ id: "projects", label: "Projects" },
	{ id: "contact", label: "Contact" },
];

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [showLinks, setShowLinks] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handler = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handler);
		return () => window.removeEventListener("scroll", handler);
	}, []);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "-30% 0px -30% 0px",
			threshold: 0,
		};

		const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(intersectionCallback, options);
		const sections = links.map((link) => document.querySelector(`#${link.id}`));

		for (const link of sections) {
			if (link) observer.observe(link);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<motion.header
			className={`fixed top-4 inset-x-0 z-50 px-4 max-w-5xl mx-auto transition-all duration-300`}
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div
				className={`flex items-center justify-between h-14 px-6 rounded-2xl transition-all duration-300 ${
					scrolled
						? "bg-surface/85 backdrop-blur-xl border border-border shadow-lg shadow-black/5"
						: "bg-surface/50 backdrop-blur-md border border-border-subtle"
				}`}
			>
				<a
					href="#hero"
					className="font-display text-base font-bold text-text-primary hover:text-accent transition-colors tracking-tight"
				>
					Christopher Høe
				</a>

				<nav
					aria-label="Main navigation"
					className="hidden md:flex items-center gap-6 font-body text-sm text-text-muted font-medium"
				>
					{links.map((link) => {
						const isActive = activeSection === link.id;
						return (
							<a
								key={link.id}
								href={`#${link.id}`}
								aria-current={isActive ? "true" : undefined}
								className={`transition-colors duration-200 py-1 relative ${
									isActive
										? "text-accent font-semibold"
										: "hover:text-text-primary"
								}`}
							>
								{link.label}
								{isActive && (
									<motion.div
										layoutId="activeNavIndicator"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
										transition={{ type: "spring", stiffness: 380, damping: 30 }}
									/>
								)}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-3">
					<ThemeToggle isMobile={false} />
					<button
						className="md:hidden text-text-muted p-1 hover:text-text-primary"
						type="button"
						onClick={() => setShowLinks((prev) => !prev)}
						aria-label={showLinks ? "Close menu" : "Open menu"}
						aria-expanded={showLinks}
					>
						{showLinks ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{showLinks && (
				<AnimatePresence>
					<motion.nav
						aria-label="Mobile navigation"
						className="md:hidden flex flex-col gap-4 mt-2 p-5 rounded-2xl bg-surface border border-border shadow-xl font-body text-sm font-medium"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
					>
						{links.map((link) => (
							<a
								key={link.id}
								href={`#${link.id}`}
								aria-current={activeSection === link.id ? "true" : undefined}
								className={`py-1.5 transition-colors ${
									activeSection === link.id
										? "text-accent font-semibold"
										: "text-text-muted hover:text-text-primary"
								}`}
								onClick={() => setShowLinks(false)}
							>
								{link.label}
							</a>
						))}
					</motion.nav>
				</AnimatePresence>
			)}
		</motion.header>
	);
}
