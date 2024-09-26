import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export interface TextProps {
	name: string;
	text: string;
	direction?: 'left' | 'right';
}

const TextContent = ({ name, text, direction = 'right' }: TextProps) => {
	const controls = useAnimation();
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.3
	});

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const variants = {
		hidden: {
			opacity: 0,
			x: isMobile ? (direction === 'right' ? 50 : -50) : direction === 'right' ? 300 : -300
		},
		visible: { opacity: 1, x: 0 }
	};

	return (
		<>
			<motion.section
				ref={ref}
				animate={controls}
				initial="hidden"
				variants={variants}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
				className="flex w-full flex-col gap-y-8 rounded-2xl border-4 p-6 text-center shadow-xl tablet:w-6/12"
			>
				<h4 className="text-2xl font-extrabold">{name}</h4>
				<p className="text-lg">{text}</p>
			</motion.section>
		</>
	);
};
export default TextContent;
