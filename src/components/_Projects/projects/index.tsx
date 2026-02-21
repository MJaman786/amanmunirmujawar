import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: "P2P Chat & File Sharing",
      description: "Built a Peer to Peer Chat and File Sharing with real-time communication capabilities, enabling seamless peer-to-peer connections and no logs.",
      techStack: ["React", "Tailwind CSS", "Node.js", "Socket.io", "MongoDB", "Axios"],
      image: "/images/projects/p2p-mern.png",
      liveDemo: "https://peer2peer-application.vercel.app/",
      github: "https://github.com/yourusername/project"
    },
    {
      title: "Freelancer Invoice Tracker",
      description: "Full-featured Webplatform for Freelancers that track the progress of the project and generate invoice for clients",
      techStack: ["React","Tailwind CSS", "Express.js", "MongoDB", "Jwt", "Axios", "ChartJs"],
      image: "/images/projects/freelancer-mern.png",
      liveDemo: "https://demo-link.com",
      github: "https://github.com/yourusername/project"
    },
    {
      title: "Url Management Platform",
      description: "A modern URL management system enabling users to generate, manage, and monitor links with real-time updates and a clean dashboard experience",
      techStack: ["React","Tailwind CSS", "Node.js", "MongoDB", "Axios", "React Query"],
      image: "/images/projects/url-mern.png",
      liveDemo: "https://shortly-five-psi.vercel.app",
      github: "https://github.com/yourusername/project"
    },
    {
      title: "Interior Design",
      description: "A sleek frontend-focused interior design application built with React, emphasizing aesthetics, usability, and responsive design.",
      techStack: ["React", "Tailwind CSS", "ChartJs", "Framer Motion"],
      image: "/images/projects/interiorDesign-frontent.png",
      liveDemo: "https://interior-design-eosin-seven.vercel.app/",
      github: "https://github.com/yourusername/project"
    },
    {
      title: "Ecommerce Platform",
      description: "A frontend-focused ecommerce platform built with React and Tailwind CSS, delivering a clean design and engaging user experience",
      techStack: ["React", "Tailwind CSS", "Context Api", "JSON Api"],
      image: "/images/projects/ecommerce-frontent.png",
      liveDemo: "https://ecommerce-store-project-one.vercel.app/",
      github: "https://github.com/yourusername/project"
    },
    {
      title: "Restaurant Website",
      description: "Interactive weather app providing real-time forecasts, location-based updates, and detailed meteorological data visualization.",
      techStack: ["React", "Tailwind CSS", "Axios"],
      image: "/images/projects/foodWebsite-frontent.png",
      liveDemo: "https://restaurant-website-five-jet.vercel.app/",
      github: "https://github.com/yourusername/project"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in full-stack development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col group"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Hide the img on error so the gradient background shows through
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-900 hover:shadow-lg"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-xl"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}