import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = ["about", "skills", "projects", "contact"];

export default function Header() {
	const [scrollBorder, setScrollBorder] = useState(false);
	const [showLinks, setShowLinks] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handler = () => {
			setScrollBorder(window.scrollY > 20);
		};

		window.addEventListener("scroll", handler);

		return () => window.removeEventListener("scroll", handler);
	}, []);

	useEffect(() => {
		const options = {
			root: null, // observe the viewport
			rootMargin: "-30% 0px -30% 0px",
			scrollMargin: "0px",
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
		const sections = links.map((link) => {
			return document.querySelector(`#${link}`);
		});

		if (sections) {
			for (const link of sections) {
				if (link === null) {
					continue;
				}
				observer.observe(link);
			}
		}

		return () => observer.disconnect();
	}, []);

	const handleShowLinks = () => {
		setShowLinks((prev) => !prev);
	};

	return (
		<motion.header
			className={`fixed top-0 inset-x-0 z-50 ${
				scrollBorder ? "border-b border-border-subtle" : "border-transparent"
			} bg-surface-container/80 px-4 backdrop-blur-lg w-full transition-colors duration-300`}
			initial={{ y: -80 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between h-16">
				<a
					href="#hero"
					className="font-mono text-accent font-bold tracking-tighter"
				>
					C.HOE_PORTFOLIO
				</a>

				<nav
					aria-label="Main navigation"
					className="hidden md:flex items-center gap-8 font-mono text-sm uppercase text-text-muted tracking-wider"
				>
					{links.map((link) => (
						<a
							key={link}
							href={`#${link}`}
							aria-current={activeSection === link ? "true" : undefined}
							className={`hover:text-accent transition-colors duration-200 ${activeSection === link ? "text-accent font-bold" : ""} `}
						>
							{link}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<button
						className="md:hidden font-mono text-text-muted"
						type="button"
						onClick={handleShowLinks}
						aria-label={showLinks ? "Close menu" : "Open menu"}
						aria-expanded={showLinks}
					>
						{showLinks ? (
							<X size={20} aria-hidden="true" />
						) : (
							<Menu size={20} aria-hidden="true" />
						)}
					</button>
				</div>
			</div>
			{showLinks && (
				<AnimatePresence>
					<motion.nav
						aria-label="Mobile navigation"
						className="flex flex-col gap-6 overflow-hidden px-4 pb-4 font-mono text-sm uppercase text-text-muted tracking-wider"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
					>
						{links.map((link) => (
							<a
								key={link}
								href={`#${link}`}
								aria-current={activeSection === link ? "true" : undefined}
								className={`hover:text-accent transition-colors duration-200 ${activeSection === link ? "text-accent font-bold" : ""}`}
								onClick={() => setShowLinks(false)}
							>
								{link}
							</a>
						))}
						<ThemeToggle isMobile={true} />
					</motion.nav>
				</AnimatePresence>
			)}
		</motion.header>
	);
}
