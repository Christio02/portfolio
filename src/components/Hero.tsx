import { motion } from 'framer-motion';

const Hero = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="py-20 text-center"
		>
			<motion.h1
				className="text-gradient-1 mb-4 text-4xl font-bold sm:text-5xl md:text-6xl"
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
			>
				Hi, I'm Christopher Høe
			</motion.h1>
			<motion.p
				className="text-muted-foreground mb-8 text-xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				Informatics Student & Web Developer
			</motion.p>
		</motion.section>
	);
};

export default Hero;
