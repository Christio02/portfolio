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
	const roundedLetter = useTransform(count, (latest) => Math.round(latest));
	const displayedText = useTransform(roundedLetter, (latest) => helloText.slice(0, latest));

	useEffect(() => {
		const unsubscribe = displayedText.on('change', (v) => {
			setText(v);
		});

		const controls = animate(count, helloText.length, {
			type: 'tween',
			delay: delay,
			duration: 1.2,
			ease: 'easeOut',
			onComplete: () => {
				setDone(true);
			}
		});

		return () => {
			controls.stop();
			unsubscribe();
		};
	}, [count, displayedText, helloText.length, delay]);

	return (
		<div className="h-auto sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
			<div className="mb-4">
				<motion.div
					className="block"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.6,
						delay: Math.max(0, delay - 0.2),
						ease: 'easeOut'
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
						<span>{text}</span>
						{!done && <CursorBlinker />}
					</Header>
				</motion.div>
			</div>
			<motion.div
				className="mt-2"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.6,
					delay: delay + 1.2,
					ease: 'easeOut'
				}}
			>
				<RedoText delay={0.3} />
			</motion.div>
		</div>
	);
};

export default TextAnimation;
