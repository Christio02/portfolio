import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

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

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const variants = {
		hidden: { opacity: 0, x: direction === 'right' ? 300 : -300 },
		visible: { opacity: 2, x: 0 }
	};

	return (
		<>
			<motion.section
				ref={ref}
				animate={controls}
				initial="hidden"
				variants={variants}
				transition={{ duration: 0.8 }}
				className="shadow-black-400 tablet:w-6/12 flex w-10/12 flex-col gap-y-8 overflow-x-hidden rounded-2xl border-4 p-6 text-center shadow-xl"
			>
				<h4 className="text-2xl font-extrabold">{name}</h4>
				<p className="text-lg">{text}</p>
			</motion.section>
		</>
	);
};
export default TextContent;
