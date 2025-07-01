import { AnimatePresence, motion, type Easing } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import Logo from './ui/Logo';
import ThemeToggle from './ThemeToggle';

const PDF = 'cv_english.pdf';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const logoVariants = {
		hover: {
			scale: 1.05,
			transition: { duration: 0.3, ease: 'easeOut' as Easing }
		}
	};

	const navItemVariants = {
		hover: {
			scale: 1.05,
			transition: { duration: 0.2 }
		}
	};

	const menuButtonVariants = {
		hover: { scale: 1.1 },
		tap: { scale: 0.95 }
	};

	const mobileMenuVariant = {
		open: {
			y: '0%',
			transition: {
				duration: 0.6,
				ease: 'circOut' as Easing
			}
		},
		closed: {
			y: '-100%',
			transition: {
				duration: 0.5,
				ease: 'circOut' as Easing
			}
		}
	};

	const ulVariant = {
		open: {
			transition: {
				delayChildren: 0.1,
				staggerChildren: 0.1
			}
		},
		closed: {
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1
			}
		}
	};

	const liVariant = {
		open: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeOut' as Easing
			}
		},
		closed: {
			opacity: 0,
			y: 20,
			transition: {
				duration: 0.2,
				ease: 'easeIn' as Easing
			}
		}
	};

	return (
		<nav
			className={
				isOpen
					? 'bg-secondary-foreground relative shadow-none'
					: 'bg-secondary-foreground relative shadow-md'
			}
			aria-label="Main Navigation"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<motion.div className="flex items-center" variants={logoVariants} whileHover="hover">
						<a href="/" className="flex shrink-0 items-center">
							<Logo className="h-10 w-10" />
						</a>
					</motion.div>

					{/* Desktop menu */}
					<div className="hidden md:flex">
						<ul className="flex items-center space-x-4">
							<motion.li variants={navItemVariants} whileHover="hover">
								<a
									href={PDF}
									target="_blank"
									className="text-muted-foreground hover:text-primary relative rounded-md px-3 py-2 text-2xl font-medium"
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
									className="text-muted-foreground hover:text-primary relative rounded-md px-3 py-2 text-2xl font-medium"
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
								<a
									href="/game"
									className="text-muted-foreground hover:text-primary relative rounded-md px-3 py-2 text-2xl font-medium"
								>
									Game
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

					{/* Mobile menu button */}
					<motion.button
						type="button"
						onClick={toggleMenu}
						className="inline-flex items-center justify-center rounded-full p-2 md:hidden"
						variants={menuButtonVariants}
						whileHover="hover"
						whileTap="tap"
						aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
					>
						{isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
					</motion.button>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="mobile-menu"
						className="bg-secondary-foreground absolute z-50 w-full"
						id="mobile-menu"
						initial="closed"
						animate="open"
						exit="closed"
						variants={mobileMenuVariant}
						style={{
							boxShadow: isOpen
								? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
								: 'none'
						}}
						onAnimationComplete={(definition) => {
							if (definition === 'closed') {
								const mobileMenu = document.getElementById('mobile-menu');
								if (mobileMenu) {
									mobileMenu.style.boxShadow = 'none';
								}
							}
						}}
					>
						<motion.ul className="space-y-6 px-2 py-6" variants={ulVariant}>
							<motion.li className="px-1" variants={liVariant}>
								<a
									href={PDF}
									target="_blank"
									rel="noopener noreferrer"
									className="block rounded-md px-3 py-2 text-2xl font-medium transition-colors duration-200 hover:bg-gray-100/10"
								>
									CV
								</a>
							</motion.li>
							<motion.li className="px-1" variants={liVariant}>
								<a
									href="/contact"
									className="hover:text-primary block rounded-md px-3 py-2 text-2xl font-medium transition-colors duration-200 hover:bg-gray-100/10"
								>
									Contact
								</a>
							</motion.li>
							<motion.li className="flex px-4 py-2" variants={liVariant}>
								<div className="flex items-center">
									<ThemeToggle isMobile={true} />
								</div>
							</motion.li>
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
