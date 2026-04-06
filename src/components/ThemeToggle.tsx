import { Monitor, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";

const iconVariants = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
};

interface ThemeToggleProps {
	isMobile: boolean;
}

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "auto";
	}

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

	if (mode === "auto") {
		document.documentElement.removeAttribute("data-theme");
	} else {
		document.documentElement.setAttribute("data-theme", mode);
	}

	document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle({ isMobile }: ThemeToggleProps) {
	const [mode, setMode] = useState<ThemeMode>("auto");
	const [osDark, setOsDark] = useState<boolean>(false);

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	useEffect(() => {
		if (mode !== "auto") {
			return;
		}

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		setOsDark(media.matches);
		const onChange = (event: MediaQueryListEvent) => {
			setOsDark(event.matches);
			applyThemeMode("auto");
		};

		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
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

	const isDark = mode === "dark" || (mode === "auto" && osDark);

	return (
		<>
			{!isMobile ? (
				<motion.div
					className={`relative flex h-10 w-20 cursor-pointer items-center justify-start rounded-full p-1 transition-all duration-300 ${
						isDark ? "bg-blue-950" : "bg-amber-500"
					}`}
					onClick={toggleMode}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					role="button"
					tabIndex={0}
					aria-label={label}
				>
					<motion.div
						className={`absolute h-8 w-8 rounded-full ${isDark ? "bg-white" : "bg-black"} shadow-md`}
						layout
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 30,
						}}
						style={{
							left: isDark ? "calc(100% - 2rem - 0.25rem)" : "0.25rem",
						}}
					/>
					<AnimatePresence mode="wait" initial={false}>
						{mode === "auto" ? (
							<motion.div
								key="auto"
								className="absolute inset-0 flex items-center justify-center"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<Monitor
									size={16}
									className={`${isDark ? "text-slate-100 opacity-90" : "text-zinc-800 opacity-90"} `}
								/>
							</motion.div>
						) : mode === "dark" ? (
							<motion.div
								key="moon"
								className="absolute left-2"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<Moon size={18} className="text-white" />
							</motion.div>
						) : (
							<motion.div
								key="sun"
								className="absolute right-2"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<Sun size={18} className="text-black" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			) : (
				<motion.div
					className={`relative flex h-8 w-14 cursor-pointer items-center justify-start rounded-full p-1 transition-all duration-300 ${
						isDark ? "bg-blue-800" : "bg-amber-400"
					}`}
					onClick={toggleMode}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					role="button"
					tabIndex={0}
					aria-label={label}
				>
					<motion.div
						className={`absolute h-6 w-6 rounded-full ${isDark ? "bg-white" : "bg-black"} shadow-md`}
						layout
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 30,
						}}
						style={{
							left: isDark ? "calc(100% - 1.75rem)" : "0.25rem",
							top: "0.25rem",
						}}
					/>
					<AnimatePresence mode="wait" initial={false}>
						{mode === "auto" ? (
							<motion.div
								key="auto"
								className="absolute inset-0 flex items-center justify-center"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								layout
							>
								<Monitor
									size={14}
									className={`${isDark ? "text-slate-100 opacity-90" : "text-zinc-800 opacity-90"} `}
								/>
							</motion.div>
						) : mode === "dark" ? (
							<motion.div
								key="moon"
								className="absolute top-1/2 left-1.5 -translate-y-1/2"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								layout
							>
								<Moon size={16} className="text-white" />
							</motion.div>
						) : (
							<motion.div
								key="sun"
								className="absolute top-1/2 right-1.5 -translate-y-1/2"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								layout
							>
								<Sun size={16} className="text-black" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</>
	);
}
