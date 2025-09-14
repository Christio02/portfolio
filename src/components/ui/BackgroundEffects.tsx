import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface Particle {
	id: number;
	x: number;
	y: number;
	size: number;
	color: string;
	speed: number;
	direction: number;
}

const BackgroundEffects = () => {
	const [particles, setParticles] = useState<Particle[]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	// Initialize particles with better distribution
	useEffect(() => {
		const updateDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		const initialParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 3 + 2, // Smaller, more subtle particles
			color: ['primary', 'secondary', 'accent'][i % 3],
			speed: Math.random() * 0.5 + 0.2,
			direction: Math.random() * Math.PI * 2
		}));

		setParticles(initialParticles);

		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	// Smooth mouse tracking
	const handleMouseMove = useCallback((e: MouseEvent) => {
		setMousePosition((prev) => ({
			x: prev.x + (e.clientX - prev.x) * 0.1,
			y: prev.y + (e.clientY - prev.y) * 0.1
		}));
	}, []);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [handleMouseMove]);

	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<motion.div
				className="absolute inset-0"
				style={{
					background: `
                        radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.03) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, hsl(var(--secondary) / 0.02) 0%, transparent 50%)
                    `
				}}
				animate={{
					background: [
						`radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.03) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, hsl(var(--secondary) / 0.02) 0%, transparent 50%)`,
						`radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.04) 0%, transparent 60%),
                         radial-gradient(circle at 20% 80%, hsl(var(--accent) / 0.04) 0%, transparent 60%),
                         radial-gradient(circle at 60% 60%, hsl(var(--secondary) / 0.03) 0%, transparent 60%)`,
						`radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.03) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, hsl(var(--secondary) / 0.02) 0%, transparent 50%)`
					]
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
			/>

			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute rounded-full opacity-40"
					style={{
						backgroundColor: `hsl(var(--${particle.color}))`,
						width: particle.size,
						height: particle.size,
						filter: 'blur(1px)'
					}}
					animate={{
						x: [
							particle.x,
							particle.x + Math.cos(particle.direction) * 200,
							particle.x + Math.cos(particle.direction + Math.PI) * 150,
							particle.x
						],
						y: [
							particle.y,
							particle.y + Math.sin(particle.direction) * 150,
							particle.y + Math.sin(particle.direction + Math.PI) * 100,
							particle.y
						],
						scale: [1, 1.2, 0.8, 1],
						opacity: [0.4, 0.6, 0.2, 0.4]
					}}
					transition={{
						duration: 20 + particle.id * 2,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: particle.id * 1.5
					}}
				/>
			))}

			<motion.div
				className="pointer-events-none absolute rounded-full"
				style={{
					background:
						'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, hsl(var(--accent) / 0.02) 40%, transparent 70%)',
					width: 300,
					height: 300,
					x: mousePosition.x - 150,
					y: mousePosition.y - 150
				}}
				animate={{
					scale: [1, 1.1, 1]
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
			/>

			<motion.div
				className="absolute top-1/4 right-1/4 opacity-5"
				style={{
					width: 100,
					height: 100,
					background: 'linear-gradient(45deg, hsl(var(--accent) / 0.3), transparent)',
					clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
				}}
				animate={{
					rotate: [0, 360],
					scale: [1, 1.1, 1]
				}}
				transition={{
					duration: 50,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>

			<motion.div
				className="absolute bottom-1/4 left-1/4 opacity-5"
				style={{
					width: 80,
					height: 80,
					background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.3), transparent)',
					borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
				}}
				animate={{
					rotate: [0, -360],
					scale: [1, 1.2, 1]
				}}
				transition={{
					duration: 45,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>

			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
					mixBlendMode: 'overlay'
				}}
			/>
		</div>
	);
};

export default BackgroundEffects;
