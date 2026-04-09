import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/Skills";
import { education, experiences, projects } from "@/data/data";

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
