import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TextAnimation from './TextAnimation';

const Hero = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="relative mt-0 mb-0 flex min-h-[70vh] items-center justify-center overflow-hidden py-20 text-center"
		>
			<div className="pointer-events-none absolute inset-0">
				{/* Dynamic gradient background */}
				<motion.div
					className="absolute inset-0 opacity-40"
					style={{
						background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
                            hsl(var(--primary) / 0.4) 0%,
                            hsl(var(--secondary) / 0.3) 25%,
                            hsl(var(--accent) / 0.2) 50%,
                            transparent 70%)`
					}}
					animate={{
						scale: [1, 1.15, 1],
						rotate: [0, 2, 0]
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: 'easeInOut'
					}}
				/>

				{/* Floating orbs */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full blur-xl"
						style={{
							background: i % 2 === 0 ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--accent) / 0.15)',
							width: `${100 + i * 25}px`,
							height: `${100 + i * 25}px`
						}}
						animate={{
							x: [0, 120, -120, 0],
							y: [0, -120, 120, 0],
							scale: [1, 1.3, 0.7, 1]
						}}
						transition={{
							duration: 12 + i * 2,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.7
						}}
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight
						}}
					/>
				))}

				{/* Wave effect instead of grid */}
				<motion.div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage: `
                            repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                hsl(var(--foreground) / 0.1) 2px,
                                hsl(var(--foreground) / 0.1) 4px
                            )
                        `,
						backgroundSize: '100% 40px'
					}}
					animate={{
						backgroundPositionY: ['0px', '40px']
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'linear'
					}}
				/>

				{/* Diagonal lines effect */}
				<motion.div
					className="absolute inset-0 opacity-5"
					style={{
						backgroundImage: `
                            repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 50px,
                                hsl(var(--primary) / 0.1) 50px,
                                hsl(var(--primary) / 0.1) 52px
                            )
                        `
					}}
					animate={{
						backgroundPosition: ['0px 0px', '100px 100px']
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: 'linear'
					}}
				/>
			</div>

			<div className="relative z-10">
				<TextAnimation delay={1} />
			</div>
		</motion.section>
	);
};

export default Hero;
