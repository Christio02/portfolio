import { motion } from 'framer-motion';
import { createElement, type JSX } from 'react';

interface HeaderProps {
	children: React.ReactNode;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	size?: 'small' | 'medium' | 'large' | 'xlarge';
	gradient?: 'gradient-2' | 'gradient-3' | 'none';
	center?: boolean;
	marginBottom?: 'none' | 'small' | 'medium' | 'large';
	weight?: 'medium' | 'bold';
	animated?: boolean;
	className?: string;
	animationProps?: {
		initial?: object;
		animate?: object;
		transition?: object;
	};
}

const Header = ({
	children,
	level = 2,
	size = 'large',
	gradient = 'gradient-2',
	center = false,
	marginBottom = 'medium',
	weight = 'bold',
	animated = false,
	className = '',
	animationProps
}: HeaderProps) => {
	// sizes
	const sizeClasses = {
		small: 'text-sm leading-relaxed sm:text-base md:text-lg lg:text-xl xl:text-2xl',
		medium: 'text-lg leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
		large: 'text-xl leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
		xlarge: 'text-xl leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'
	};

	// gradients
	const gradientClasses = {
		'gradient-2': 'text-gradient-2',
		'gradient-3': 'text-gradient-3',
		none: ''
	};

	// margin-bottom
	const marginClasses = {
		none: '',
		small: 'mb-2',
		medium: 'mb-4',
		large: 'mb-8'
	};

	// bold
	const weightClasses = {
		medium: 'font-medium',
		bold: 'font-bold'
	};

	// build classname
	const completeClassName = [
		sizeClasses[size],
		gradientClasses[gradient],
		weightClasses[weight],
		marginClasses[marginBottom],
		center ? 'text-center' : '',
		className
	]
		.filter(Boolean)
		.join(' ');

	// default animation
	const defaultAnimationProps = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 }
	};

	const finalAnimationProps = animationProps || defaultAnimationProps;

	// create heading
	const headingTag = `h${level}` as keyof JSX.IntrinsicElements;

	if (animated) {
		return createElement(
			motion[headingTag as keyof typeof motion] as any,
			{
				className: completeClassName,
				...finalAnimationProps
			},
			children
		);
	}

	return createElement(headingTag, { className: completeClassName }, children);
};

export default Header;
