import Navbar from "../../common/header";
import ProjectsSection from "./projects";

export default function Project() {
    return (
        <>
            <div className="home-page-compo">
                {/* header */}
                <Navbar title="Projects" />
                <ProjectsSection />
            </div>
        </>
    )
}