import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface HeaderProps {
	children: React.ReactNode;
	size: 'small' | 'medium' | 'large';
	gradient: 'gradient-1' | 'gradient-2';
	marginBottom: 'small' | 'medium' | 'large';
}

const Header = ({ children, size, gradient, marginBottom }: HeaderProps) => {
	const sizeClasses = {
		small: 'text-lg',
		medium: 'text-2xl md:text-3xl',
		large: 'text-3xl md:text-4xl lg:text-5xl'
	};

	const gradientClasses = {
		'gradient-1': 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
		'gradient-2': 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
	};

	const marginClasses = {
		small: 'mb-2',
		medium: 'mb-6',
		large: 'mb-8'
	};

	return (
		<h2
			className={`${sizeClasses[size]} ${gradientClasses[gradient]} ${marginClasses[marginBottom]} font-bold`}
		>
			{children}
		</h2>
	);
};

// Skills content component
const SkillsContent = () => (
	<div className="space-y-6">
		<p className="text-lg leading-relaxed">
			Through my studies at <strong>NTNU</strong>, work at start-up{' '}
			<strong>Hoggorm Design A/S</strong>, and involvement with{' '}
			<strong>Studentmediene in Trondheim</strong>, I've built expertise across modern web
			technologies and development practices.
		</p>

		<div className="space-y-8">
			<div>
				<h3 className="text-primary mb-4 text-xl font-semibold">Professional Experience</h3>

				<div className="space-y-6">
					<div>
						<h4 className="mb-2 text-lg font-medium">Software Engineer - Hoggorm Design A/S</h4>
						<p className="text-muted-foreground mb-3">
							Developing scalable web applications using <strong>React, Next.js, TypeScript</strong>
							, and <strong>Sanity CMS</strong> with <strong>Tailwind CSS</strong> for responsive
							design.
						</p>
						<div>
							<p className="text-accent mb-2 font-medium">Key Achievements:</p>
							<ul className="text-muted-foreground ml-4 list-inside list-disc space-y-1">
								<li>Improved SEO scores and site traffic through performance optimization</li>
								<li>Reduced bandwidth usage by 80% via image optimization and lazy loading</li>
								<li>Implemented secure deployment pipelines and performance monitoring</li>
							</ul>
						</div>
					</div>

					<div>
						<h4 className="mb-2 text-lg font-medium">Developer - Studentmediene</h4>
						<p className="text-muted-foreground mb-3">
							Built dynamic applications with <strong>React & TypeScript</strong> in an agile team
							environment, focusing on code quality and user experience.
						</p>
						<div>
							<p className="text-accent mb-2 font-medium">Notable Projects:</p>
							<ul className="text-muted-foreground ml-4 list-inside list-disc space-y-1">
								<li>Course review system with positive user feedback</li>
								<li>GDPR-compliant privacy consent system with full-stack implementation</li>
								<li>Advanced Git workflows and peer code review processes</li>
							</ul>
						</div>
					</div>

					<div>
						<h4 className="mb-2 text-lg font-medium">Academic Projects</h4>
						<p className="text-muted-foreground">
							Developed <strong>REST APIs in Java/C#</strong> and advanced web applications through
							coursework and bachelor's thesis, covering API design, database modeling, and testing
							practices.
						</p>
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-primary mb-4 text-xl font-semibold">Technical Skills</h3>
				<div className="space-y-3">
					<div>
						<span className="text-accent font-medium">Frontend: </span>
						<span className="text-muted-foreground">
							React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, State Management (Context
							API, Apollo Client, Tanstack Query)
						</span>
					</div>
					<div>
						<span className="text-accent font-medium">Backend: </span>
						<span className="text-muted-foreground">
							Node.js, Express.js, Java Spring Boot, C# ASP.NET Core, RESTful APIs, GraphQL
						</span>
					</div>
					<div>
						<span className="text-accent font-medium">Tools & Databases: </span>
						<span className="text-muted-foreground">
							MongoDB, PostgreSQL, Git, Docker, CI/CD, Azure, Jest, JUnit
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const AboutContent = () => (
	<div className="space-y-6">
		<p className="text-lg leading-relaxed">
			I'm a passionate developer with a strong foundation in modern web technologies and a keen eye
			for creating engaging user experiences. My journey in software development has been shaped by
			both academic excellence and real-world professional experience.
		</p>
		<p className="text-lg leading-relaxed">
			Currently pursuing my studies while working professionally, I believe in the power of
			continuous learning and staying up-to-date with the latest technologies and best practices in
			the industry.
		</p>
	</div>
);

interface ContentBlock {
	title: string;
	content: React.ReactNode;
}

interface AboutSectionProps {
	aboutMe?: ContentBlock;
	skills?: ContentBlock;
}

const AboutSection = ({
	aboutMe = { title: 'About Me', content: <AboutContent /> },
	skills = { title: 'Skills & Technologies', content: <SkillsContent /> }
}: AboutSectionProps) => {
	const [isMobile, setIsMobile] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		const checkReducedMotion = () => {
			const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
			setPrefersReducedMotion(mediaQuery.matches);
		};

		checkMobile();
		checkReducedMotion();
		window.addEventListener('resize', checkMobile);

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
		mediaQuery.addEventListener('change', handler);

		return () => {
			window.removeEventListener('resize', checkMobile);
			mediaQuery.removeEventListener('change', handler);
		};
	}, []);

	const { scrollY } = useScroll();
	const parallax1 = useTransform(scrollY, [0, 500], [0, 20]);
	const parallax2 = useTransform(scrollY, [0, 500], [0, -20]);

	const fadeInRight = {
		hidden: {
			opacity: 0,
			x: -60,
			y: 30,
			scale: 0.95
		},
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut' as const
			}
		},
		hover: {
			y: -2,
			scale: 1.001,
			transition: {
				duration: 0.2,
				ease: 'easeOut' as const
			}
		}
	};

	const fadeInLeft = {
		hidden: {
			opacity: 0,
			x: 60,
			y: 30,
			scale: 0.95
		},
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut' as const
			}
		},
		hover: {
			y: -2,
			scale: 1.001,
			transition: {
				duration: 0.2,
				ease: 'easeOut' as const
			}
		}
	};

	const shouldAnimate = !prefersReducedMotion && !isMobile;

	return (
		<section className="relative w-full py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-24 sm:gap-32">
					{/* About Me Block */}
					<motion.div
						className="group from-secondary/30 to-card/50 relative h-full overflow-hidden rounded-xl bg-gradient-to-br p-1 shadow-lg transition-all duration-500 hover:shadow-2xl"
						initial={shouldAnimate ? 'hidden' : undefined}
						whileInView={shouldAnimate ? 'visible' : undefined}
						whileHover={shouldAnimate ? 'hover' : undefined}
						viewport={{ once: true, amount: 0.1 }}
						{...(shouldAnimate && { variants: fadeInRight })}
						style={{
							y: shouldAnimate ? parallax1 : 0,
							transformOrigin: 'center',
							willChange: shouldAnimate ? 'transform, opacity' : 'auto',
							backfaceVisibility: 'hidden'
						}}
					>
						<motion.div
							className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							style={{
								background:
									'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))',
								backgroundSize: '300% 300%'
							}}
							animate={{
								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'linear'
							}}
						/>

						<div className="bg-card relative z-10 flex h-full flex-col overflow-hidden rounded-lg p-8 sm:p-12">
							<div className="from-primary via-secondary to-accent mb-8 h-px w-24 bg-gradient-to-r opacity-60 transition-all duration-700 group-hover:w-32 group-hover:opacity-100" />

							<Header size="medium" gradient="gradient-2" marginBottom="medium">
								{aboutMe.title}
							</Header>

							<div className="prose prose-lg text-foreground/80 group-hover:text-foreground max-w-none transition-colors duration-300 [&>div]:space-y-6 [&>p]:mb-6 [&>p]:leading-relaxed">
								{aboutMe.content}
							</div>
						</div>
					</motion.div>

					{/* Skills Block */}
					<motion.div
						className="group from-secondary/30 to-card/50 relative h-full overflow-hidden rounded-xl bg-gradient-to-bl p-1 shadow-lg transition-all duration-500 hover:shadow-2xl"
						initial={shouldAnimate ? 'hidden' : undefined}
						whileInView={shouldAnimate ? 'visible' : undefined}
						whileHover={shouldAnimate ? 'hover' : undefined}
						viewport={{ once: true, amount: 0.1 }}
						{...(shouldAnimate && { variants: fadeInLeft })}
						style={{
							y: shouldAnimate ? parallax2 : 0,
							transformOrigin: 'center',
							willChange: shouldAnimate ? 'transform, opacity' : 'auto',
							backfaceVisibility: 'hidden'
						}}
					>
						<motion.div
							className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							style={{
								background:
									'linear-gradient(45deg, hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary)))',
								backgroundSize: '300% 300%'
							}}
							animate={{
								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'linear'
							}}
						/>

						<div className="bg-card relative z-10 flex h-full flex-col overflow-hidden rounded-lg p-8 sm:p-12">
							<div className="from-accent via-secondary to-primary mb-8 ml-auto h-px w-24 bg-gradient-to-l opacity-60 transition-all duration-700 group-hover:w-32 group-hover:opacity-100" />

							<Header size="medium" gradient="gradient-2" marginBottom="medium">
								{skills.title}
							</Header>

							<div className="prose prose-lg text-foreground/80 group-hover:text-foreground max-w-none transition-colors duration-300 [&>div]:space-y-6 [&>p]:mb-6 [&>p]:leading-relaxed">
								{skills.content}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
