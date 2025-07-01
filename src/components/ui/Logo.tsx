interface LogoProps {
	className?: string;
}

const Logo = ({ className = 'w-10 h-10' }: LogoProps) => {
	return (
		<svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#4F46E5" />
					<stop offset="100%" stopColor="#7C3AED" />
				</linearGradient>
			</defs>
			<rect width="100" height="100" rx="20" fill="url(#logoGradient)" />
			<text
				x="50"
				y="50"
				dominantBaseline="middle"
				textAnchor="middle"
				fill="white"
				fontFamily="Arial, sans-serif"
				fontSize="45"
				fontWeight="bold"
			>
				CH
			</text>
			<path d="M20 80 L80 80" stroke="white" strokeWidth="4" strokeLinecap="round" />
		</svg>
	);
};

export default Logo;
