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
		threshold: 0.1
	});

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);
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
				className="flex w-full flex-col justify-center gap-y-4 rounded-2xl border-2 p-4 text-center shadow-md tablet:w-10/12 tablet:gap-y-6 tablet:border-4 tablet:p-6 laptop:min-h-[300px] laptop:p-8 desktop:min-h-[400px]"
			>
				<h4 className="text-xl font-bold tablet:text-4xl">{name}</h4>
				<p className="text-sm tablet:text-2xl">{text}</p>
			</motion.section>
		</>
	);
};
export default TextContent;
