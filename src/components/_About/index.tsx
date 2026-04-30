import {
  GraduationCap,
  Code,
  Brain,
  Cloud,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      title: "Education",
      desc: "BE in Information Technology",
      detail: "Foundation in algorithms & systems architecture."
    },
    {
      icon: <Code className="w-6 h-6 text-indigo-600" />,
      title: "MERN Stack",
      desc: "Full-stack Mastery",
      detail: "Building robust SPAs with MongoDB, Express, React, and Node."
    },
    {
      icon: <Cloud className="w-6 h-6 text-sky-500" />,
      title: "Cloud & DevOps",
      desc: "AWS Basics",
      detail: "Hands-on with EC2, S3, and cloud-native deployments."
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "AI / ML",
      desc: "Internship Experience",
      detail: "Leveraging data-driven insights to enhance web logic."
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-50" id="about">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-indigo-600"></div>
          <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Introduction</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Me</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              I am a results-driven <span className="font-semibold text-slate-900">IT Graduate</span> passionate about
              crafting seamless digital experiences. My core expertise lies in the <span className="text-indigo-600 font-medium">MERN Stack</span>, where I bridge the gap between aesthetic frontend design and scalable backend logic.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Beyond standard web development, I’ve explored the frontiers of <span className="font-medium text-slate-900 text-sm border-b-2 border-purple-200">AI and Cloud Computing</span> during my internship. I thrive in environments that challenge me to learn, adapt, and build performant, user-centric applications.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-indigo-100">
                View My Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl transition-all duration-300">
                Download CV
              </button> */}
              <a
                href="/resume.pdf"
                download="Aman_Mujawar_Resume.pdf"
                className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl transition-all duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column: Skill Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden relative"
              >
                {/* Subtle Background Accent */}
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors duration-300"></div>

                <div className="relative z-10">
                  <div className="mb-4 inline-block p-3 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm font-medium text-indigo-600 mb-2">{item.desc}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Banner - Continuous Learning */}
        <div className="mt-16 p-8 bg-white border border-slate-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-xs font-bold italic">React</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-white text-xs font-bold italic">Node</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-orange-400 flex items-center justify-center text-white text-xs font-bold italic">AWS</div>
            </div>
            <p className="text-slate-600 font-medium italic text-sm md:text-base">
              Currently diving deeper into Next.js 14 and Serverless Architectures...
            </p>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-tighter animate-pulse">
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            Always Learning
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;