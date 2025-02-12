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
			className="bg-card mx-auto max-w-3xl overflow-hidden rounded-lg shadow-lg"
		>
			<div className="bg-gradient-2 h-2" />
			<div className="p-6">
				<h2 className="text-gradient-2 mb-4 text-3xl font-bold">{name}</h2>
				<p className="text-foreground/80 text-lg leading-relaxed">{text}</p>
			</div>
		</motion.div>
	);
};

export default TextContent;
