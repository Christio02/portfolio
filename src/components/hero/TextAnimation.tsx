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
			duration: 1,
			ease: 'easeInOut',
			onComplete: () => {
				setDone(true);
			}
		});
		return () => {
			controls.stop;
			unsubscribe;
		};
	}, []);

	return (
		<div style={{ height: '6rem', overflow: 'hidden' }}>
			<div style={{ height: '3rem' }}>
				<motion.span className="text-gradient-2 block text-4xl">
					{text}
					{!done && <CursorBlinker />}
				</motion.span>
			</div>
			<div>
				<RedoText delay={delay + 1} />
				<CursorBlinker />
			</div>
		</div>
	);
};
export default TextAnimation;
