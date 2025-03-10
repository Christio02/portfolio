import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const iconVariants = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 }
};

interface ThemeToggleProps {
	isMobile: boolean;
}

const ThemeToggle = ({ isMobile }: ThemeToggleProps) => {
	const [mounted, setMounted] = useState(false);
	const [isDark, setIsDark] = useState(false);

	// Initialize theme based on localStorage or system preference when component mounts
	useEffect(() => {
		setMounted(true);

		// Check localStorage first
		const savedTheme = localStorage.getItem('theme');

		if (savedTheme === 'dark') {
			setIsDark(true);
		} else if (savedTheme === 'light') {
			setIsDark(false);
		} else {
			// If no saved preference, use system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
			setIsDark(prefersDark.matches);
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

		const listener = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				setIsDark(e.matches);
			}
		};

		prefersDark.addEventListener('change', listener);
		return () => {
			prefersDark.removeEventListener('change', listener);
		};
	}, [mounted]);

	useEffect(() => {
		if (!mounted) return;

		if (isDark) {
			document.documentElement.classList.add('dark', 'theme');
		} else {
			document.documentElement.classList.remove('dark', 'theme');
		}
	}, [isDark, mounted]);

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		localStorage.setItem('theme', newTheme ? 'dark' : 'light');
	};

	if (!mounted) return null;

	return (
		<>
			{!isMobile ? (
				<motion.div
					className={`relative flex h-10 w-20 cursor-pointer items-center justify-start rounded-full p-1 transition-all duration-300 ${
						isDark ? 'bg-blue-950' : 'bg-amber-500'
					}`}
					onClick={toggleTheme}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					role="button"
					tabIndex={0}
					aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
				>
					<motion.div
						className={`absolute h-8 w-8 rounded-full ${isDark ? 'bg-white' : 'bg-black'} shadow-md`}
						layout
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 30
						}}
						style={{
							left: isDark ? 'calc(100% - 2rem - 0.25rem)' : '0.25rem'
						}}
					/>
					<AnimatePresence mode="wait" initial={false}>
						{isDark ? (
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
					className={`relative flex h-5 w-10 cursor-pointer flex-col items-center justify-start rounded-full p-0 transition-all duration-300 ${
						isDark ? 'bg-blue-800' : 'bg-amber-400'
					}`}
					onClick={toggleTheme}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					role="button"
					tabIndex={0}
					aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
				>
					<motion.div
						className={`absolute h-4 w-4 rounded-full ${isDark ? 'bg-white' : 'bg-black'} shadow-md`}
						layout
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 30
						}}
						style={{
							left: isDark ? 'calc(100% - 1rem - 0.25rem)' : '0.25rem'
						}}
					/>
					<AnimatePresence mode="wait" initial={false}>
						{isDark ? (
							<motion.div
								key="moon"
								className="absolute top-0.5 left-1"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<Moon size={12} className="text-white" />
							</motion.div>
						) : (
							<motion.div
								key="sun"
								className="absolute top-0.5 right-1"
								variants={iconVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<Sun size={12} className="text-black" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</>
	);
};

export default ThemeToggle;
