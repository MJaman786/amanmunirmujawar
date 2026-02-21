import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperincePage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./utils/scrolltoTop";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/about'} element={<AboutPage />} />
          <Route path={'/experince'} element={<ExperiencePage />} />
          <Route path={'/projects'} element={<ProjectsPage />} />
          <Route path={'/contact'} element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}