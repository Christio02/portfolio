import React from 'react';
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
				className="sm:text-5xl md:text-6xl mb-4 text-4xl font-bold text-gray-900 dark:text-white"
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
			>
				Hi, I'm Christopher Høe
			</motion.h1>
			<motion.p
				className="mb-8 text-xl text-gray-600 dark:text-gray-300"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				Informatics Student & Web Developer
			</motion.p>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
				<a
					href="/projects"
					className="transform rounded-full bg-indigo-600 px-6 py-3 text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-700"
				>
					View My Projects
				</a>
			</motion.div>
		</motion.section>
	);
};

export default Hero;
