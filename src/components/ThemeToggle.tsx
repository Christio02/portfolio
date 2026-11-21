import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "auto";

const iconVariants = {
	initial: { opacity: 0, scale: 0.6, rotate: -30 },
	animate: { opacity: 1, scale: 1, rotate: 0 },
	exit: { opacity: 0, scale: 0.6, rotate: 30 },
};

interface ThemeToggleProps {
	isMobile: boolean;
}

export function getInitialThemeMode(): ThemeMode {
	if (typeof window === "undefined") return "auto";
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") {
		return stored;
	}
	return "auto";
}

export function applyThemeMode(mode: ThemeMode) {
	if (typeof window === "undefined") return;
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);
	document.documentElement.setAttribute("data-theme", resolved);
	document.documentElement.style.colorScheme = resolved;
}

export function setGlobalThemeMode(mode: ThemeMode) {
	applyThemeMode(mode);
	window.localStorage.setItem("theme", mode);
	window.dispatchEvent(new CustomEvent<ThemeMode>("theme-change", { detail: mode }));
}

export default function ThemeToggle({ isMobile }: ThemeToggleProps) {
	const [mode, setMode] = useState<ThemeMode>("auto");

	useEffect(() => {
		const initialMode = getInitialThemeMode();
		setMode(initialMode);
		applyThemeMode(initialMode);

		const onThemeChange = (e: Event) => {
			const customEvent = e as CustomEvent<ThemeMode>;
			if (customEvent.detail) {
				setMode(customEvent.detail);
			}
		};

		window.addEventListener("theme-change", onThemeChange);
		return () => window.removeEventListener("theme-change", onThemeChange);
	}, []);

	useEffect(() => {
		if (mode !== "auto") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");

		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [mode]);

	function toggleMode() {
		const nextMode: ThemeMode =
			mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
		setMode(nextMode);
		setGlobalThemeMode(nextMode);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleMode();
		}
	}

	const label =
		mode === "auto"
			? "Theme mode: auto (system). Click to switch to light mode."
			: `Theme mode: ${mode}. Click to switch mode.`;

	const alignment =
		mode === "dark" ? "flex-start" : mode === "auto" ? "center" : "flex-end";

	const renderIcon = () => {
		if (mode === "auto")
			return (
				<Monitor
					key="auto"
					size={isMobile ? 13 : 14}
					className="text-text-muted"
				/>
			);
		if (mode === "dark")
			return (
				<Moon key="dark" size={isMobile ? 13 : 14} className="text-accent" />
			);
		return (
			<Sun key="sun" size={isMobile ? 13 : 14} className="text-accent-warm" />
		);
	};

	return (
		<motion.button
			type="button"
			className={`relative flex cursor-pointer items-center rounded-md p-1 transition-colors duration-200 bg-surface-low border border-border hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
				isMobile ? "h-8 w-14" : "h-8 w-16"
			}`}
			style={{ justifyContent: alignment }}
			onClick={toggleMode}
			onKeyDown={handleKeyDown}
			whileTap={{ scale: 0.96 }}
			aria-label={label}
			title={`Theme: ${mode}`}
		>
			<motion.span
				layout
				transition={{
					type: "spring",
					stiffness: 520,
					damping: 32,
				}}
				className="flex items-center justify-center rounded-sm bg-surface border border-border-subtle shadow-xs h-6 w-6"
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={mode}
						variants={iconVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.14 }}
						className="flex items-center justify-center"
					>
						{renderIcon()}
					</motion.span>
				</AnimatePresence>
			</motion.span>
		</motion.button>
	);
}
