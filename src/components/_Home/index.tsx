import Navbar from "../../common/header";
import About from "../_About";
import Contact from "../_Contact/Contact";
import Experience from "../_Experience/Experience";
import ProjectsSection from "../_Projects/projects";
import Skills from "../_Skills";
import Hero from "./_Hero";

export default function Home() {
    return (
        <>
            <div className="home-page-compo">
                {/* header */}
                <Navbar title="Home" />
                <Hero />
                <About />
                <Skills />
                <Experience />
                <ProjectsSection />
                <Contact />
            </div>
        </>
    )
}