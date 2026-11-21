import {
	ArrowUpRight,
	CornerDownLeft,
	FolderGit2,
	Hash,
	Monitor,
	Moon,
	Search,
	Sun,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects, SocialLinks } from "@/data/data";
import { setGlobalThemeMode } from "./ThemeToggle";

interface CommandItem {
	id: string;
	label: string;
	group: "Navigation" | "Projects" | "Appearance" | "External";
	meta?: string;
	icon: React.ReactNode;
	action: () => void;
}

interface CommandPaletteProps {
	open: boolean;
	onClose: () => void;
	onSelectProject: (title: string) => void;
}

export default function CommandPalette({
	open,
	onClose,
	onSelectProject,
}: CommandPaletteProps) {
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const scrollToSection = useCallback(
		(id: string) => {
			onClose();
			const el = document.querySelector(`#${id}`);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		},
		[onClose],
	);

	const commands = useMemo<CommandItem[]>(() => {
		const navItems: CommandItem[] = [
			{
				id: "nav-hero",
				label: "Top / Overview",
				group: "Navigation",
				meta: "00",
				icon: <Hash size={14} />,
				action: () => scrollToSection("hero"),
			},
			{
				id: "nav-about",
				label: "About & Experience Timeline",
				group: "Navigation",
				meta: "01",
				icon: <Hash size={14} />,
				action: () => scrollToSection("about"),
			},
			{
				id: "nav-skills",
				label: "Skills & Technical Stack",
				group: "Navigation",
				meta: "02",
				icon: <Hash size={14} />,
				action: () => scrollToSection("skills"),
			},
			{
				id: "nav-projects",
				label: "Selected Projects",
				group: "Navigation",
				meta: "03",
				icon: <Hash size={14} />,
				action: () => scrollToSection("projects"),
			},
			{
				id: "nav-contact",
				label: "Contact / Send Message",
				group: "Navigation",
				meta: "04",
				icon: <Hash size={14} />,
				action: () => scrollToSection("contact"),
			},
		];

		const projectItems: CommandItem[] = projects.map((project) => ({
			id: `proj-${project.title}`,
			label: project.title,
			group: "Projects",
			meta: project.status,
			icon: <FolderGit2 size={14} />,
			action: () => {
				onClose();
				onSelectProject(project.title);
			},
		}));

		const themeItems: CommandItem[] = [
			{
				id: "theme-light",
				label: "Switch to Light Theme",
				group: "Appearance",
				meta: "Sky / Amber",
				icon: <Sun size={14} />,
				action: () => {
					setGlobalThemeMode("light");
					onClose();
				},
			},
			{
				id: "theme-dark",
				label: "Switch to Dark Theme",
				group: "Appearance",
				meta: "Obsidian / Mint",
				icon: <Moon size={14} />,
				action: () => {
					setGlobalThemeMode("dark");
					onClose();
				},
			},
			{
				id: "theme-auto",
				label: "Use System Theme",
				group: "Appearance",
				meta: "Auto",
				icon: <Monitor size={14} />,
				action: () => {
					setGlobalThemeMode("auto");
					onClose();
				},
			},
		];

		const externalItems: CommandItem[] = SocialLinks.map((link) => ({
			id: `ext-${link.name}`,
			label: `Open ${link.name}`,
			group: "External",
			meta: "↗",
			icon: <ArrowUpRight size={14} />,
			action: () => {
				window.open(link.url, "_blank", "noopener,noreferrer");
				onClose();
			},
		}));

		return [...navItems, ...projectItems, ...themeItems, ...externalItems];
	}, [onClose, onSelectProject, scrollToSection]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter(
			(item) =>
				item.label.toLowerCase().includes(q) ||
				item.group.toLowerCase().includes(q) ||
				item.meta?.toLowerCase().includes(q),
		);
	}, [commands, query]);

	useEffect(() => {
		if (open) {
			setQuery("");
			setActiveIndex(0);
			const timer = setTimeout(() => inputRef.current?.focus(), 20);
			return () => clearTimeout(timer);
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				setActiveIndex((prev) =>
					filtered.length === 0 ? 0 : (prev + 1) % filtered.length,
				);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setActiveIndex((prev) =>
					filtered.length === 0
						? 0
						: (prev - 1 + filtered.length) % filtered.length,
				);
			} else if (e.key === "Enter" && filtered[activeIndex]) {
				e.preventDefault();
				filtered[activeIndex].action();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, filtered, activeIndex, onClose]);

	const groups: Array<CommandItem["group"]> = [
		"Navigation",
		"Projects",
		"Appearance",
		"External",
	];

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4 bg-black/50 backdrop-blur-xs"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
					onClick={onClose}
					role="dialog"
					aria-modal="true"
					aria-label="Command palette"
				>
					<motion.div
						className="w-full max-w-xl bg-surface border border-border rounded-md shadow-2xl overflow-hidden corner-ticks"
						initial={{ opacity: 0, y: -12, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.98 }}
						transition={{ duration: 0.16, ease: "easeOut" }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface-low/60">
							<Search size={16} className="text-accent shrink-0" />
							<input
								ref={inputRef}
								type="text"
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
									setActiveIndex(0);
								}}
								placeholder="Jump to section, project, or theme..."
								className="w-full bg-transparent text-sm font-body text-text-primary placeholder:text-text-dim outline-none"
							/>
							<button
								type="button"
								onClick={onClose}
								aria-label="Close command palette"
								className="p-1 text-text-dim hover:text-text-primary transition-colors cursor-pointer"
							>
								<X size={15} />
							</button>
						</div>

						<div className="max-h-[55vh] overflow-y-auto py-2">
							{filtered.length === 0 ? (
								<div className="px-4 py-8 text-center font-mono text-xs text-text-dim">
									No matching commands for "{query}"
								</div>
							) : (
								groups.map((groupName) => {
									const groupItems = filtered.filter(
										(item) => item.group === groupName,
									);
									if (groupItems.length === 0) return null;

									return (
										<div key={groupName} className="mb-2 last:mb-0">
											<div className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">
												{groupName}
											</div>
											{groupItems.map((item) => {
												const globalIdx = filtered.indexOf(item);
												const isActive = globalIdx === activeIndex;

												return (
													<button
														key={item.id}
														type="button"
														onMouseEnter={() => setActiveIndex(globalIdx)}
														onClick={item.action}
														className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors cursor-pointer ${
															isActive
																? "bg-accent/12 text-text-primary"
																: "text-text-muted hover:text-text-primary"
														}`}
													>
														<span className="flex items-center gap-3 min-w-0">
															<span
																className={
																	isActive ? "text-accent" : "text-text-dim"
																}
															>
																{item.icon}
															</span>
															<span className="font-body text-sm truncate">
																{item.label}
															</span>
														</span>
														<span className="flex items-center gap-2 shrink-0 ml-3">
															{item.meta && (
																<span className="font-mono text-[11px] text-text-dim tabular-nums">
																	{item.meta}
																</span>
															)}
															{isActive && (
																<CornerDownLeft
																	size={13}
																	className="text-accent"
																/>
															)}
														</span>
													</button>
												);
											})}
										</div>
									);
								})
							)}
						</div>

						<div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface-low/60 font-mono text-[11px] text-text-dim">
							<div className="flex items-center gap-3">
								<span>↑↓ navigate</span>
								<span>↵ select</span>
								<span>esc close</span>
							</div>
							<span className="tabular-nums">{filtered.length} cmds</span>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
