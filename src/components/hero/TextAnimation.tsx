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
			duration: 1,
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
				<motion.div className="block">
					<Header
						size="xlarge"
						gradient="gradient-2"
						marginBottom="none"
						className="block"
						animated={false}
					>
						{text}
						{!done && <CursorBlinker />}
					</Header>
				</motion.div>
			</div>
			<div className="mt-2">
				<RedoText delay={delay + 1} />
				<CursorBlinker />
			</div>
		</div>
	);
};
export default TextAnimation;
