import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const PDF = 'cv_english.pdf';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const navItemVariants = {
		hover: {
			scale: 1.05,
			transition: { duration: 0.2 }
		}
	};

	const menuButtonVariants = {
		hover: { rotate: 180, scale: 1.1 },
		tap: { scale: 0.95 }
	};

	const logoVariants = {
		hover: {
			scale: 1.02,
			transition: { duration: 0.2 }
		}
	};

	const mobileMenuVariants = {
		initial: {
			height: 0,
			opacity: 0,
			y: -10
		},
		animate: {
			height: 'auto',
			opacity: 1,
			y: 0,
			transition: {
				height: { duration: 0.3 },
				opacity: { duration: 0.2, delay: 0.1 },
				y: { duration: 0.2, delay: 0.1 }
			}
		},
		exit: {
			height: 0,
			opacity: 0,
			y: -10,
			transition: {
				height: { duration: 0.3 },
				opacity: { duration: 0.2 },
				y: { duration: 0.2 }
			}
		}
	};

	return (
		<nav className="bg-secondary-foreground relative shadow-md" aria-label="Main Navigation">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<motion.div className="flex items-center" variants={logoVariants} whileHover="hover">
						<a href="/" className="flex shrink-0 items-center">
							<Logo className="h-10 w-10" />
							<motion.span
								className="text-gradient-2 ml-2 text-4xl font-bold"
								initial={{ backgroundPosition: '0%' }}
								whileHover={{
									backgroundPosition: '100%',
									transition: { duration: 1 }
								}}
							>
								Christopher Høe
							</motion.span>
						</a>
					</motion.div>

					<div className="hidden md:flex">
						<ul className="flex items-center space-x-4">
							<motion.li variants={navItemVariants} whileHover="hover">
								<a
									href={PDF}
									target="_blank"
									className="relative rounded-md px-3 py-2 text-2xl font-medium"
									rel="noopener noreferrer"
								>
									CV
									<motion.div
										className="absolute bottom-0 left-0 h-0.5 w-0 bg-current"
										whileHover={{ width: '100%' }}
										transition={{ duration: 0.2 }}
									/>
								</a>
							</motion.li>
							<motion.li variants={navItemVariants} whileHover="hover">
								<a
									href="/contact"
									className="hover:text-primary text-muted-foreground relative rounded-md px-3 py-2 text-2xl font-medium"
								>
									Contact
									<motion.div
										className="absolute bottom-0 left-0 h-0.5 w-0 bg-current"
										whileHover={{ width: '100%' }}
										transition={{ duration: 0.2 }}
									/>
								</a>
							</motion.li>
							<motion.li>
								<ThemeToggle isMobile={false} />
							</motion.li>
						</ul>
					</div>

					<motion.button
						type="button"
						onClick={toggleMenu}
						className="inline-flex items-center justify-center rounded-full p-2 md:hidden"
						variants={menuButtonVariants}
						whileHover="hover"
						whileTap="tap"
						aria-label="Toggle Menu"
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
					>
						<Menu className="h-8 w-8" />
					</motion.button>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="mobile-menu"
						variants={mobileMenuVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="bg-secondary-foreground absolute w-full shadow-lg md:hidden"
						id="mobile-menu"
					>
						<ul className="space-y-1 px-2 py-3">
							<motion.li
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 }}
							>
								<a
									href={PDF}
									target="_blank"
									rel="noopener noreferrer"
									className="block rounded-md px-3 py-2 text-2xl font-medium transition-all duration-300 hover:bg-gray-100/10"
								>
									CV
								</a>
							</motion.li>
							<motion.li
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3 }}
							>
								<a
									href="/contact"
									className="hover:text-primary block rounded-md px-3 py-2 text-2xl font-medium transition-all duration-300 hover:bg-gray-100/10"
								>
									Contact
								</a>
							</motion.li>
							<motion.li>
								<ThemeToggle isMobile={true} />
							</motion.li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
