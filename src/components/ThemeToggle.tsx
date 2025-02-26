import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { isDark, toggleTheme } from '../stores/themeStore';

const iconVariants = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 }
};

interface ThemeToggleProps {
	isMobile: boolean;
}

const ThemeToggle = ({ isMobile }: ThemeToggleProps) => {
	const $isDark = useStore(isDark);
	return (
		<>
			{!isMobile ? (
				<motion.div
					className={`relative flex h-10 w-20 cursor-pointer items-center justify-start rounded-full p-1 transition-all duration-300 ${
						$isDark ? 'bg-blue-800' : 'bg-amber-400'
					}`}
					onClick={toggleTheme}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					role="button"
					tabIndex={0}
					aria-label={`Switch to ${$isDark ? 'light' : 'dark'} mode`}
				>
					<motion.div
						className={`absolute h-8 w-8 rounded-full ${$isDark ? 'bg-white' : 'bg-black'} shadow-md`}
						layout
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 30
						}}
						style={{
							left: $isDark ? 'calc(100% - 2rem - 0.25rem)' : '0.25rem'
						}}
					/>
					<AnimatePresence mode="wait" initial={false}>
						{$isDark ? (
							<motion.div
								key="moon"
								className="absolute left-2"
								custom={$isDark}
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
								custom={$isDark}
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
						$isDark ? 'bg-blue-800' : 'bg-amber-400'
					}`}
					onClick={toggleTheme}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					role="button"
					tabIndex={0}
					aria-label={`Switch to ${$isDark ? 'light' : 'dark'} mode`}
				>
					<motion.div
						className={`absolute h-4 w-4 rounded-full ${$isDark ? 'bg-white' : 'bg-black'} shadow-md`}
						layout
						transition={{
							type: 'spring',
							stiffness: 500,
							damping: 30
						}}
						style={{
							left: $isDark ? 'calc(100% - 2rem - 0.25rem)' : '0.25rem'
						}}
					/>
					<AnimatePresence mode="wait" initial={false}>
						{$isDark ? (
							<motion.div
								key="moon"
								className="absolute top-2"
								custom={$isDark}
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
								className="absolute bottom-2"
								custom={$isDark}
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
			)}
		</>
	);
};

export default ThemeToggle;
