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
				y: -4,
				scale: 1.01,
				transition: { duration: 0.2, ease: 'easeOut' }
			}}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className="group from-card/60 via-card/40 to-card/20 border-foreground/10 hover:border-primary/40 relative w-full overflow-hidden rounded-2xl border bg-gradient-to-br shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl"
		>
			<div className="from-primary via-secondary to-accent absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20" />

			<div className="from-primary/60 via-secondary/60 to-accent/60 group-hover:from-primary group-hover:via-secondary group-hover:to-accent relative h-1 bg-gradient-to-r transition-all duration-300" />

			<div className="relative p-6 lg:p-8">
				<Header size="medium" gradient="gradient-2" marginBottom="medium">
					{name}
				</Header>
				<div className="text-foreground/80 group-hover:text-foreground text-sm leading-relaxed transition-colors duration-300 lg:text-base">
					{text.split('\n').map((paragraph, index) => (
						<p key={index} className={index > 0 ? 'mt-4' : ''}>
							{paragraph}
						</p>
					))}
				</div>
			</div>

			<div className="from-primary/10 absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</motion.div>
	);
};

export default TextContent;
