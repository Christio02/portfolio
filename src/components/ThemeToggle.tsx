import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";

const iconVariants = {
	initial: { opacity: 0, scale: 0.5, rotate: -45 },
	animate: { opacity: 1, scale: 1, rotate: 0 },
	exit: { opacity: 0, scale: 0.5, rotate: 45 },
};

interface ThemeToggleProps {
	isMobile: boolean;
}

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") return "auto";
	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") {
		return stored;
	}
	return "auto";
}

function applyThemeMode(mode: ThemeMode) {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	document.documentElement.setAttribute("data-theme", resolved);

	document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle({ isMobile }: ThemeToggleProps) {
	const [mode, setMode] = useState<ThemeMode>("auto");

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
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
		applyThemeMode(nextMode);
		window.localStorage.setItem("theme", nextMode);
	}

	const label =
		mode === "auto"
			? "Theme mode: auto (system). Click to switch to light mode."
			: `Theme mode: ${mode}. Click to switch mode.`;

	// where knob should be on track
	const alignment =
		mode === "dark" ? "flex-start" : mode === "auto" ? "center" : "flex-end";

	const renderIcon = () => {
		if (mode === "auto")
			return (
				<Monitor
					key="auto"
					size={isMobile ? 14 : 16}
					className="text-text-muted"
				/>
			);
		if (mode === "dark")
			return (
				<Moon
					key="dark"
					size={isMobile ? 14 : 16}
					className="text-text-primary"
				/>
			);
		return (
			<Sun key="sun" size={isMobile ? 14 : 16} className="text-accent-warm" />
		);
	};

	return (
		<motion.div
			className={`relative flex cursor-pointer items-center rounded-full p-1 transition-colors duration-300 bg-surface-container border border-border-subtle ${
				isMobile ? "h-8 w-16" : "h-10 w-20"
			}`}
			style={{ justifyContent: alignment }}
			onClick={toggleMode}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			role="button"
			tabIndex={0}
			aria-label={label}
		>
			<motion.div
				layout
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 30,
				}}
				className={`flex items-center justify-center rounded-full bg-surface shadow-md border border-border-subtle ${
					isMobile ? "h-6 w-6" : "h-8 w-8"
				}`}
			>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={mode}
						variants={iconVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.15 }}
						className="flex items-center justify-center"
					>
						{renderIcon()}
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</motion.div>
	);
}
