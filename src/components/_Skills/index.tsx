import { Terminal, Code2, Database, Layout, Settings } from 'lucide-react';

type SkillPillProps = {
  name: string,
  colorClass: string
}

const SkillPill = ({ name, colorClass }:SkillPillProps) => (
  <div className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-2 ${colorClass}`}>
    {name}
  </div>
);

const Skills = () => {
  const skillGroups = [
    {
      category: "Languages",
      icon: <Code2 size={18} />,
      skills: [
        { name: "Python", color: "bg-blue-50 text-blue-700" },
        { name: "JavaScript", color: "bg-yellow-50 text-yellow-700" },
        { name: "TypeScript", color: "bg-sky-50 text-sky-700" },
        { name: "Bash", color: "bg-slate-100 text-slate-700" },
        { name: "HTML", color: "bg-orange-50 text-orange-700" },
        { name: "CSS", color: "bg-indigo-50 text-indigo-700" }
      ]
    },
    {
      category: "Frontend & Design",
      icon: <Layout size={18} />,
      skills: [
        { name: "React.js", color: "bg-cyan-50 text-cyan-700" },
        { name: "Tailwind CSS", color: "bg-teal-50 text-teal-700" },
        { name: "Bootstrap", color: "bg-purple-50 text-purple-700" }
      ]
    },
    {
      category: "Backend & Cloud",
      icon: <Terminal size={18} />,
      skills: [
        { name: "Node.js", color: "bg-emerald-50 text-emerald-700" },
        { name: "Express.js", color: "bg-rose-50 text-rose-700" },
        { name: "AWS (EC2, S3)", color: "bg-orange-100 text-orange-800" },
        { name: "Git", color: "bg-red-50 text-red-700" }
      ]
    },
    {
      category: "Databases & AI",
      icon: <Database size={18} />,
      skills: [
        { name: "MongoDB", color: "bg-green-50 text-green-700" },
        { name: "PostgreSQL", color: "bg-blue-100 text-blue-800" },
        { name: "TensorFlow", color: "bg-orange-50 text-orange-600" },
        { name: "NumPy", color: "bg-indigo-100 text-indigo-900" }
      ]
    },
    {
      category: "Tools",
      icon: <Settings size={18} />,
      skills: [
        { name: "VS Code", color: "bg-blue-50 text-blue-600" },
        { name: "Jupyter Notebook", color: "bg-orange-50 text-orange-700" },
        { name: "Linux", color: "bg-zinc-100 text-zinc-800" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Technical Arsenal</h2>
          <div className="h-1.5 w-20 bg-indigo-600 rounded-full" />
        </div>

        <div className="space-y-10">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
                {group.icon}
                {group.category}
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, sIdx) => (
                  <SkillPill key={sIdx} name={skill.name} colorClass={skill.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;