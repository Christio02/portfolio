import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TextAnimation from './TextAnimation';

const Hero = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
	const [scrollY, setScrollY] = useState(0);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		setMousePosition({
			x: (e.clientX / window.innerWidth) * 100,
			y: (e.clientY / window.innerHeight) * 100
		});
	}, []);

	const handleScroll = useCallback(() => {
		setScrollY(window.scrollY);
	}, []);

	useEffect(() => {
		setIsLoaded(true);

		let mouseTimeout: NodeJS.Timeout;
		const throttledMouseMove = (e: MouseEvent) => {
			clearTimeout(mouseTimeout);
			mouseTimeout = setTimeout(() => handleMouseMove(e), 16); // ~60fps
		};

		let scrollTimeout: NodeJS.Timeout;
		const throttledScroll = () => {
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
		};

		const timeoutId = setTimeout(() => {
			window.addEventListener('mousemove', throttledMouseMove, { passive: true });
			window.addEventListener('scroll', throttledScroll, { passive: true });
		}, 200);

		return () => {
			clearTimeout(timeoutId);
			clearTimeout(mouseTimeout);
			clearTimeout(scrollTimeout);
			window.removeEventListener('mousemove', throttledMouseMove);
			window.removeEventListener('scroll', throttledScroll);
		};
	}, [handleMouseMove, handleScroll]);

	const gradientStyle = useMemo(
		() => ({
			background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
			hsl(var(--primary) / 0.1) 0%, 
			hsl(var(--secondary) / 0.05) 40%, 
			transparent 70%)`
		}),
		[mousePosition.x, mousePosition.y]
	);

	const transformStyle = useMemo(
		() => ({
			transform: `translateY(${scrollY * 0.2}px)`
		}),
		[scrollY]
	);

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-20 text-center"
			style={transformStyle}
		>
			<div className="pointer-events-none absolute inset-0">
				{isLoaded && (
					<>
						<motion.div
							className="absolute inset-0 opacity-10"
							style={gradientStyle}
							animate={{
								scale: [1, 1.01, 1]
							}}
							transition={{
								duration: 15,
								repeat: Infinity,
								ease: 'easeInOut'
							}}
						/>

						<motion.div
							className="absolute top-1/4 left-1/4 opacity-2"
							style={{
								width: 80,
								height: 80,
								background: 'hsl(var(--primary) / 0.15)',
								borderRadius: '50%',
								filter: 'blur(2px)'
							}}
							animate={{
								rotate: [0, 360],
								scale: [1, 1.03, 1]
							}}
							transition={{
								duration: 50,
								repeat: Infinity,
								ease: 'linear'
							}}
						/>

						<motion.div
							className="absolute right-1/4 bottom-1/3 opacity-2"
							style={{
								width: 50,
								height: 50,
								background: 'hsl(var(--accent) / 0.15)',
								borderRadius: '30%',
								filter: 'blur(2px)'
							}}
							animate={{
								rotate: [0, -360],
								scale: [1, 1.05, 1]
							}}
							transition={{
								duration: 60,
								repeat: Infinity,
								ease: 'linear'
							}}
						/>
					</>
				)}

				<div
					className="absolute inset-0 opacity-2"
					style={{
						backgroundImage: `
							linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px),
							linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
						`,
						backgroundSize: '100px 100px'
					}}
				/>
			</div>

			<div className="relative z-10 mx-auto w-full max-w-4xl px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 1,
						delay: 0.2,
						ease: [0.25, 0.46, 0.45, 0.94]
					}}
					className="relative rounded-3xl border border-transparent p-8 backdrop-blur-sm sm:p-12"
					style={{
						background: 'linear-gradient(135deg, hsl(var(--card) / 0.02), hsl(var(--card) / 0.01))',
						backdropFilter: 'blur(6px)'
					}}
				>
					<div className="via-primary/30 absolute top-0 left-1/2 h-px w-24 -translate-x-1/2 transform bg-gradient-to-r from-transparent to-transparent opacity-60" />

					<TextAnimation delay={0.5} />

					<motion.div
						className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.5, duration: 0.8 }}
					>
						<motion.div
							className="border-foreground/20 flex h-10 w-6 justify-center rounded-full border-2"
							animate={{
								borderColor: [
									'hsl(var(--foreground) / 0.2)',
									'hsl(var(--primary) / 0.4)',
									'hsl(var(--foreground) / 0.2)'
								]
							}}
							transition={{ duration: 3, repeat: Infinity }}
						>
							<motion.div
								className="bg-foreground/30 mt-2 h-3 w-1 rounded-full"
								animate={{
									y: [0, 12, 0],
									opacity: [0.3, 0.8, 0.3]
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: 'easeInOut'
								}}
							/>
						</motion.div>
						<div className="text-foreground/40 mt-2 text-xs font-light tracking-wider">SCROLL</div>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
};

export default Hero;
