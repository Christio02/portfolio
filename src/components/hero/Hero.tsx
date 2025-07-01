import { motion } from 'framer-motion';
import TextAnimation from './TextAnimation';

const Hero = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="mt-0 mb-0 py-10 text-center"
		>
			<TextAnimation delay={1} />
		</motion.section>
	);
};

export default Hero;
