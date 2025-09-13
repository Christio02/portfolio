import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
	id: number;
	x: number;
	y: number;
	size: number;
	color: string;
	duration: number;
}

const BackgroundEffects = () => {
	const [particles, setParticles] = useState<Particle[]>([]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const initialParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: Math.random() * 6 + 3,
			color: i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'accent',
			duration: Math.random() * 25 + 15
		}));
		setParticles(initialParticles);

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			{/* Enhanced particles with more coverage */}
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute rounded-full opacity-20 blur-sm"
					style={{
						backgroundColor: `hsl(var(--${particle.color}))`,
						width: particle.size,
						height: particle.size
					}}
					initial={{
						x: particle.x,
						y: particle.y
					}}
					animate={{
						x: [
							particle.x,
							particle.x + Math.sin(particle.id) * 150,
							particle.x + Math.cos(particle.id) * 100,
							particle.x
						],
						y: [
							particle.y,
							particle.y + Math.cos(particle.id) * 120,
							particle.y + Math.sin(particle.id) * 80,
							particle.y
						],
						scale: [1, 1.8, 0.6, 1],
						opacity: [0.2, 0.4, 0.1, 0.2]
					}}
					transition={{
						duration: particle.duration,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: particle.id * 0.3
					}}
				/>
			))}

			{/* mouse follower */}
			<motion.div
				className="pointer-events-none absolute rounded-full"
				style={{
					background:
						'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--accent) / 0.05) 50%, transparent 70%)',
					width: 400,
					height: 400,
					x: mousePosition.x - 200,
					y: mousePosition.y - 200
				}}
				animate={{
					scale: [1, 1.3, 1]
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
			/>

			{/* shapes */}
			<motion.div
				className="absolute top-10 right-10 h-40 w-40 opacity-5"
				style={{
					background: 'linear-gradient(45deg, hsl(var(--accent)), transparent)',
					clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
				}}
				animate={{
					rotate: [0, 360],
					scale: [1, 1.2, 1]
				}}
				transition={{
					duration: 40,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>

			<motion.div
				className="absolute bottom-10 left-10 h-32 w-32 opacity-5"
				style={{
					background: 'linear-gradient(135deg, hsl(var(--secondary)), transparent)',
					borderRadius: '0 50% 0 50%'
				}}
				animate={{
					rotate: [0, -360],
					scale: [1, 1.4, 1]
				}}
				transition={{
					duration: 35,
					repeat: Infinity,
					ease: 'linear'
				}}
			/>

			{/* multiple mesh gradients */}
			<div
				className="absolute inset-0 opacity-30"
				style={{
					background: `
                        radial-gradient(circle at 10% 20%, hsl(var(--primary) / 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, hsl(var(--accent) / 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 50% 50%, hsl(var(--secondary) / 0.05) 0%, transparent 30%),
                        radial-gradient(circle at 80% 10%, hsl(var(--primary) / 0.08) 0%, transparent 35%),
                        radial-gradient(circle at 20% 90%, hsl(var(--accent) / 0.08) 0%, transparent 35%)
                    `
				}}
			/>
		</div>
	);
};

export default BackgroundEffects;
