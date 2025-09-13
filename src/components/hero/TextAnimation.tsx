import Header from '@/components/ui/Header';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import CursorBlinker from './CursorBlinker';
import RedoText from './RedoText';

export interface TextAnimationProps {
	delay: number;
}

const TextAnimation = ({ delay }: TextAnimationProps) => {
	const [done, setDone] = useState(false);
	const [text, setText] = useState('');
	const helloText = 'Hi, I am Christopher Høe';
	const count = useMotionValue(0);
	// need for typing "whole" letters
	const roundedLetter = useTransform(count, (latest) => Math.round(latest));
	const displayedText = useTransform(roundedLetter, (latest) => helloText.slice(0, latest));

	useEffect(() => {
		const unsubscribe = displayedText.on('change', (v) => setText(v));
		const controls = animate(count, helloText.length, {
			type: 'tween',
			delay: delay,
			duration: 1.5,
			ease: 'easeInOut',
			onComplete: () => {
				setDone(true);
			}
		});
		return () => {
			controls.stop();
			unsubscribe();
		};
	}, [delay]);

	return (
		<div className="h-auto sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
			<div className="mb-4">
				<motion.div
					className="block"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						duration: 0.8,
						delay: delay - 0.2,
						ease: 'easeOut'
					}}
				>
					<motion.div
						animate={{
							y: [0, -5, 0]
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: delay + 2
						}}
					>
						<Header
							size="xlarge"
							level={1}
							gradient="gradient-2"
							marginBottom="none"
							className="block drop-shadow-lg"
							animated={false}
						>
							{text.split('').map((char, index) => (
								<motion.span
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.1,
										delay: delay + index * 0.05
									}}
									className="inline-block"
									whileHover={{
										scale: 1.1,
										color: 'hsl(var(--accent))',
										transition: { duration: 0.2 }
									}}
								>
									{char === ' ' ? '\u00A0' : char}
								</motion.span>
							))}
							{!done && <CursorBlinker />}
						</Header>
					</motion.div>
				</motion.div>
			</div>
			<motion.div
				className="mt-2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					delay: delay + 1.5,
					ease: 'easeOut'
				}}
			>
				<RedoText delay={delay + 1.5} />
				<CursorBlinker />
			</motion.div>
		</div>
	);
};
export default TextAnimation;
