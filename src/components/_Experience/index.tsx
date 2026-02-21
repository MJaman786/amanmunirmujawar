import Navbar from "../../common/header";
import Experience from "./Experience";

export default function ExperienceComponent() {
    return (
        <>
            <div className="home-page-compo">
                {/* header */}
                <Navbar title="Experince" />
                <Experience />
            </div>
        </>
    )
}