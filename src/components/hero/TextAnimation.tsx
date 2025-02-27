import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import CursorBlinker from './CursorBlinker';
import RedoText from './RedoText';

export interface TextAnimationProps {
	delay: number;
}

const TextAnimation = ({ delay }: TextAnimationProps) => {
	const [done, setDone] = useState(false);

	const helloText = 'Hi, I am Christopher Høe';
	const count = useMotionValue(0);

	// need for typing "whole" letters
	const roundedLetter = useTransform(count, (latest) => Math.round(latest));
	const displayedText = useTransform(roundedLetter, (latest) => helloText.slice(0, latest));

	useEffect(() => {
		const controls = animate(count, helloText.length, {
			type: 'tween',
			delay: delay,
			duration: 1,
			ease: 'easeInOut',
			onComplete: () => {
				setDone(true);
			}
		});
		return controls.stop;
	}, []);

	return (
		<span className="">
			<motion.span className="text-gradient-2 text-4xl">{displayedText}</motion.span>

			<>
				<br /> <br />
			</>

			<RedoText delay={delay + 1} />
			<CursorBlinker />
		</span>
	);
};
export default TextAnimation;
