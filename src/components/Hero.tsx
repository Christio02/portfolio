import { MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const roles = [
	"distributed systems",
	"data mining",
	"machine learning",
	"web development",
	"databases",
];

const nameLetters = Array.from("Christopher Høe").reduce<
	{ char: string; key: string }[]
>((letters, char) => {
	const count = letters.filter((letter) => letter.char === char).length + 1;
	letters.push({
		char,
		key: `${char}-${count}`,
	});
	return letters;
}, []);

const Hero = () => {
	const [roleIndex, setRoleIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentRole = roles[roleIndex];

		const speed = isDeleting
			? 35
			: charIndex === currentRole.length
				? 2200
				: 60;
		const timeout = setTimeout(() => {
			if (!isDeleting && charIndex < currentRole.length) {
				setCharIndex(charIndex + 1);
			}
			if (!isDeleting && charIndex === currentRole.length) {
				// pause
				setIsDeleting(true);
			}

			if (isDeleting && charIndex > 0) {
				// delete one char
				setCharIndex(charIndex - 1);
			}

			if (isDeleting && charIndex === 0) {
				setIsDeleting(false);
				setRoleIndex((roleIndex + 1) % roles.length);
			}
		}, speed);

		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, roleIndex]);

	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.04,
			},
		},
	};

	return (
		<section className="min-h-screen flex items-center px-6 pt-26">
			<div className="max-w-6xl mx-auto">
				<motion.span
					className="font-mono text-accent text-sm"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					[system.init()]
				</motion.span>
				<motion.h1
					className="mt-6 mb-5 font-display text-4xl md:text-6xl font-extrabold text-text-primary leading-none"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{nameLetters.map(({ char, key }, index) => (
						<motion.span
							key={key}
							variants={{
								hidden: {
									opacity: 0,
									y: 12,
									filter: "blur(8px)",
									textShadow: "0 0 0 rgba(34,197,94,0)",
								},
								visible: {
									opacity: [0, 1, 0.6, 1],
									y: 0,
									filter: "blur(0px)",
									textShadow: [
										"0 0 0 rgba(34,197,94,0)",
										"0 0 14px rgba(34,197,94,0.45)",
										"0 0 6px rgba(34,197,94,0.2)",
										"0 0 0 rgba(34,197,94,0)",
									],
									transition: {
										delay: index * 0.045,
										duration: 0.55,
										ease: "easeOut",
										textShadow: {
											duration: 1.2,
											repeat: Infinity,
											ease: "easeInOut",
										},
									},
								},
							}}
							style={{
								display: "inline-block",
								whiteSpace: char === " " ? "pre" : "normal",
							}}
						>
							{char}
						</motion.span>
					))}
				</motion.h1>
				<motion.div
					className="mt-8 mb-10 font-mono text-text-muted uppercase"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
				>
					{"> "}
					{roles[roleIndex].substring(0, charIndex)}
					<motion.span
						animate={{ opacity: [1, 0] }}
						transition={{
							duration: 0.6,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					>
						▊
					</motion.span>
				</motion.div>
				<motion.div
					className="flex flex-wrap gap-4 mt-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.2, duration: 0.5 }}
				>
					<motion.a
						href="#projects"
						className="bg-accent text-bg font-mono text-sm font-bold px-7 py-3"
						whileHover={{ scale: 1.03, y: -2 }}
						whileTap={{ scale: 0.97 }}
					>
						View Projects
					</motion.a>
					<motion.a
						href="https://github.com/Christio02"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View GitHub profile (opens in new tab)"
						className="border border-border text-text-primary font-mono text-sm px-7 py-3 flex gap-2 items-center"
						whileHover={{ scale: 1.03, y: -2 }}
						whileTap={{ scale: 0.97 }}
					>
						Github
						<MoveUpRight aria-hidden="true" />
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};
export default Hero;
