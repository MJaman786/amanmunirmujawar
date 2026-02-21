import Navbar from "../../common/header";
import Contact from "./Contact";

export default function ContactComponent() {
    return (
        <>
            <div className="home-page-compo">
                {/* header */}
                <Navbar title="Contact" />
                <Contact/>
            </div>
        </>
    )
}