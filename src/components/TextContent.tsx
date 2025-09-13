import Header from '@/components/ui/Header';
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
			whileHover={{
				y: -8,
				scale: 1.02,
				transition: { duration: 0.3 }
			}}
			transition={{ duration: 0.5 }}
			className="bg-card/50 border-foreground/10 hover:border-primary/30 mx-auto max-w-3xl rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
		>
			<div className="from-primary via-secondary to-accent h-0.5 bg-gradient-to-r" />

			<div className="p-8">
				<Header size="medium" gradient="gradient-2" marginBottom="medium">
					{name}
				</Header>
				<p className="text-foreground/70 text-base leading-relaxed lg:text-lg">{text}</p>
			</div>
		</motion.div>
	);
};

export default TextContent;
