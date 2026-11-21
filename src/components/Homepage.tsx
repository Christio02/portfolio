import { useCallback, useEffect, useState } from "react";
import About from "@/components/About";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { slugifyProject } from "@/components/projects/ProjectCard";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/Skills";
import { education, experiences, projects } from "@/data/data";

const Homepage = () => {
	const [commandOpen, setCommandOpen] = useState(false);
	const [highlightedProject, setHighlightedProject] = useState<string | null>(
		null,
	);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setCommandOpen((prev) => !prev);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	const handleSelectProject = useCallback((title: string) => {
		setHighlightedProject(title);
		const targetId = `project-${slugifyProject(title)}`;
		const el =
			document.getElementById(targetId) ?? document.getElementById("projects");
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "center" });
		}
		window.setTimeout(() => {
			setHighlightedProject((current) => (current === title ? null : current));
		}, 2400);
	}, []);

	return (
		<div className="min-h-screen bg-bg text-text-primary">
			<Header onOpenCommandPalette={() => setCommandOpen(true)} />
			<CommandPalette
				open={commandOpen}
				onClose={() => setCommandOpen(false)}
				onSelectProject={handleSelectProject}
			/>
			<main>
				<Hero onOpenCommandPalette={() => setCommandOpen(true)} />
				<About experiences={experiences} education={education} />
				<Skills />
				<Projects
					projects={projects}
					highlightedProject={highlightedProject}
				/>
				<Contact />
			</main>
			<Footer />
		</div>
	);
};

export default Homepage;
