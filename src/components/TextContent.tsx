import React from 'react';
import { motion } from 'framer-motion';

interface TextContentProps {
	name: string;
	text: string;
	direction: 'left' | 'right';
}

const TextContent = ({ name, text, direction }: TextContentProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className="mx-auto max-w-3xl"
		>
			<h2 className="mb-4 text-2xl font-bold">{name}</h2>
			<p className="text-gray-600 dark:text-gray-300">{text}</p>
		</motion.div>
	);
};

export default TextContent;
