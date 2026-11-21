import { Command, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
	{ id: "about", label: "About" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
	{ id: "contact", label: "Contact" },
];

interface HeaderProps {
	onOpenCommandPalette: () => void;
}

export default function Header({ onOpenCommandPalette }: HeaderProps) {
	const [scrolled, setScrolled] = useState(false);
	const [showLinks, setShowLinks] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 240,
		damping: 32,
		restDelta: 0.001,
	});

	useEffect(() => {
		const handler = () => {
			setScrolled(window.scrollY > 24);
		};

		handler();
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "-30% 0px -30% 0px",
			threshold: 0,
		};

		const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			}
		};

		const observer = new IntersectionObserver(intersectionCallback, options);
		const sections = links.map((link) => document.querySelector(`#${link.id}`));

		for (const section of sections) {
			if (section) observer.observe(section);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<header
			className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 border-b ${
				scrolled
					? "bg-bg/95 backdrop-blur-md border-border shadow-xs"
					: "bg-bg/80 backdrop-blur-sm border-border-subtle"
			}`}
		>
			<div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-4">
				<a
					href="#hero"
					className="inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold text-text-primary hover:text-accent transition-colors tracking-tight"
				>
					<span
						className="w-2.5 h-2.5 bg-accent inline-block rounded-xs"
						aria-hidden="true"
					/>
					<span>Christopher Høe</span>
				</a>

				<nav
					aria-label="Main navigation"
					className="hidden md:flex items-center gap-2 font-display text-base font-semibold"
				>
					{links.map((link) => {
						const isActive = activeSection === link.id;
						return (
							<a
								key={link.id}
								href={`#${link.id}`}
								aria-current={isActive ? "true" : undefined}
								className={`relative px-4 py-2 rounded-md transition-colors duration-200 ${
									isActive
										? "text-accent"
										: "text-text-primary/85 hover:text-accent hover:bg-surface-low/80"
								}`}
							>
								{isActive && (
									<motion.span
										layoutId="activeNavPill"
										className="absolute inset-0 bg-accent/12 border border-accent/30 rounded-md"
										transition={{ type: "spring", stiffness: 420, damping: 32 }}
									/>
								)}
								<span className="relative z-10">{link.label}</span>
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-2.5">
					<motion.button
						type="button"
						onClick={onOpenCommandPalette}
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.96 }}
						aria-label="Open command palette (Command K)"
						className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-surface-low border border-border hover:border-accent text-text-primary font-mono text-xs font-medium transition-colors cursor-pointer"
					>
						<Command size={14} className="text-accent" />
						<span className="hidden sm:inline">K</span>
					</motion.button>
					<ThemeToggle isMobile={false} />
					<button
						className="md:hidden text-text-primary p-2 rounded-md border border-border bg-surface-low hover:border-accent cursor-pointer"
						type="button"
						onClick={() => setShowLinks((prev) => !prev)}
						aria-label={showLinks ? "Close menu" : "Open menu"}
						aria-expanded={showLinks}
					>
						{showLinks ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Scroll progress hairline */}
			<motion.div
				className="h-[2px] bg-accent origin-left"
				style={{ scaleX }}
			/>

			<AnimatePresence>
				{showLinks && (
					<motion.nav
						aria-label="Mobile navigation"
						className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-1.5 font-display text-lg font-semibold overflow-hidden"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						{links.map((link) => (
							<a
								key={link.id}
								href={`#${link.id}`}
								aria-current={activeSection === link.id ? "true" : undefined}
								className={`py-3 px-3 rounded-md flex items-center justify-between transition-colors ${
									activeSection === link.id
										? "text-accent bg-accent/10"
										: "text-text-primary hover:text-accent hover:bg-surface-low"
								}`}
								onClick={() => setShowLinks(false)}
							>
								<span>{link.label}</span>
								<span className="text-text-dim text-base">→</span>
							</a>
						))}
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
