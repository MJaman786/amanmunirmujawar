import Navbar from "../../common/header";
import About from "../../components/_About";

export default function AboutPage() {
    return (
        <>
            <div className="home-page-compo">
                {/* header */}
                <Navbar title="About" />
                <About />
            </div>
        </>
    )
}