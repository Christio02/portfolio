import Header from '@/components/ui/header';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface RedoTextProps {
	delay: number;
}

const RedoText = ({ delay }: RedoTextProps) => {
	const [text, setText] = useState('');
	const textIndex = useMotionValue(0);
	const texts = [
		'I am a computer science student and a software developer',
		'I am passionate about creating innovative solutions'
	];

	const baseText = useTransform(textIndex, (latest) => texts[latest] || '');
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));
	const updatedThisRound = useMotionValue(true);

	useEffect(() => {
		// Subscribe to displayText changes and update the text state
		const unsubscribe = displayText.on('change', (v) => setText(v));

		animate(count, 60, {
			type: 'tween',
			delay: delay,
			duration: 1,
			ease: 'easeIn',
			repeat: Infinity,
			repeatType: 'reverse',
			repeatDelay: 1,
			onUpdate(latest) {
				// If we updated already and we're not at 0 anymore,
				// set updatedThisRound to false.
				// The next time we hit 0, we will increment.
				if (updatedThisRound.get() === true && latest > 0) {
					updatedThisRound.set(false);
					// If we haven't updated yet and we're at 0,
					// increment and set updatedThisRound to true.
				} else if (updatedThisRound.get() === false && latest === 0) {
					// Set textIndex to 0 if we reach the end of our texts array.
					// So we don't run out of silly sentences
					if (textIndex.get() === texts.length - 1) {
						textIndex.set(0);
					} else {
						textIndex.set(textIndex.get() + 1);
					}
					updatedThisRound.set(true);
				}
			}
		});

		return () => {
			unsubscribe();
		};
	}, [delay]);

	return (
		<motion.div className="inline">
			<Header
				level={3}
				size="small"
				gradient="gradient-2"
				weight="medium"
				marginBottom="none"
				className="inline"
				animated={false}
			>
				{text}
			</Header>
		</motion.div>
	);
};

export default RedoText;
