import Header from '@/components/ui/Header';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface RedoTextProps {
	delay: number;
}

const RedoText = ({ delay }: RedoTextProps) => {
	const [displayText, setDisplayText] = useState('');
	const [currentTextIndex, setCurrentTextIndex] = useState(0);

	const texts = [
		'I am a computer science student and a software developer',
		'I am passionate about creating innovative solutions'
	];

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const startTyping = () => {
			const currentText = texts[currentTextIndex];
			let charIndex = 0;

			// Clear text first
			setDisplayText('');

			const typeNextChar = () => {
				if (charIndex < currentText.length) {
					setDisplayText(currentText.slice(0, charIndex + 1));
					charIndex++;
					timeoutId = setTimeout(typeNextChar, 50);
				} else {
					// Finished typing, wait then switch to next text
					timeoutId = setTimeout(() => {
						setCurrentTextIndex((prev) => (prev + 1) % texts.length);
					}, 3000);
				}
			};

			typeNextChar();
		};

		// Start typing after delay
		timeoutId = setTimeout(startTyping, delay * 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentTextIndex, delay]);

	return (
		<motion.div
			className="inline"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: delay }}
		>
			<Header
				level={3}
				size="small"
				gradient="gradient-2"
				weight="medium"
				marginBottom="none"
				className="inline"
				animated={false}
			>
				{displayText}
			</Header>
		</motion.div>
	);
};

export default RedoText;
