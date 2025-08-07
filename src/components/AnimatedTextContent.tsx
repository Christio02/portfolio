import Header from '@/components/ui/Header';
import { motion } from 'framer-motion';

interface AnimatedTextContentProps {
	title: string;
	children: React.ReactNode;
	direction: 'left' | 'right';
	delay?: number;
}

const AnimatedTextContent = ({ title, children, direction, delay = 0 }: AnimatedTextContentProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay }}
			className="bg-card mx-auto max-w-3xl overflow-hidden rounded-lg shadow-lg"
		>
			<div className="bg-gradient-2 h-2" />
			<div className="p-6">
				<Header size="medium" gradient="gradient-2" marginBottom="medium">
					{title}
				</Header>
				<div className="prose prose-lg text-foreground/80 max-w-none leading-relaxed">
					{children}
				</div>
			</div>
		</motion.div>
	);
};

export default AnimatedTextContent;