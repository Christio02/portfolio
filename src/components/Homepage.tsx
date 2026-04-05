import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/Skills";
import { education, experiences, projects } from "@/data/data";
import type { SectionLabelProps } from "@/interfaces/ComponentProps";

export const SectionLabel = ({ index, label }: SectionLabelProps) => {
	return (
		<div className="flex items-center gap-3 mb-8">
			<span className="font-mono text-[12px] text-accent tracking-[0.15em]">
				{index}
			</span>
			<span className="font-mono text-[12px] text-text-muted tracking-[0.15em] uppercase">
				/ {label}
			</span>
			<div className="flex-1 h-px bg-border-subtle" />
		</div>
	);
};

const Homepage = () => {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<About experiences={experiences} education={education} />
				<Skills />
				<Projects projects={projects} />
				<Contact />
			</main>
			<Footer />
		</>
	);
};

export default Homepage;
