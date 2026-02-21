import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import {
    Calendar, Terminal, Activity,
    Cloud, Brain
} from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Experience = () => {
    // Experience Data from Resume
    const experiences = [
        {
            role: "AWS Cloud Virtual Intern",
            company: "AICTE",
            duration: "Jan 2024 — Mar 2024",
            status: "System_Complete",
            outcomes: [
                "Gained hands-on experience with cloud infrastructure and core AWS services[cite: 24].",
                "Mastered deployment and management of resources using **EC2, S3, RDS, and IAM**.",
                "Focused on scalable architecture and secure identity access management protocols.",
            ],
            tech: ["AWS", "EC2", "S3", "RDS", "IAM"],
            // Custom data for the pie chart for THIS project
            chartData: {
                labels: ['Cloud Infrastructure', 'Storage', 'Security', 'Database'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#4f46e5', '#818cf8', '#c7d2fe', '#e2e8f0'],
                    borderWidth: 0,
                }]
            }
        },
        {
            role: "Artificial Intelligence Virtual Intern",
            company: "Acme Grade",
            duration: "Jan 2024 — Mar 2024",
            status: "Neural_Link_Complete",
            outcomes: [
                "Developed and deployed AI models using industry-standard machine learning tools.",
                "Implemented **Deep Learning** concepts for model training, evaluation, and optimization.",
                "Worked on end-to-end ML lifecycles from data preprocessing to model deployment.",
            ],
            tech: ["Python", "TensorFlow", "NumPy", "Matplotlib"],
            chartData: {
                labels: ['Model Training', 'Evaluation', 'Preprocessing', 'Deployment'],
                datasets: [{
                    data: [45, 20, 25, 10],
                    backgroundColor: ['#6366f1', '#a5b4fc', '#d1d5db', '#1e293b'],
                    borderWidth: 0,
                }]
            }
        }
    ];

    const chartOptions = {
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
        cutout: '70%',
    };

    return (
        <section className="py-24 bg-[#F8FAFC] font-poppins relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-600">
                            <Activity size={16} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Node_History.log</span>
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
                            Experince <span className="text-slate-400 text-4xl italic">Timeline.</span>
                        </h2>
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="bg-white rounded-[3rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-500 hover:shadow-indigo-100/40 hover:-translate-y-1">
                            <div className="grid grid-cols-1 lg:grid-cols-12">

                                {/* Left Content (8/12) */}
                                <div className="lg:col-span-8 p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-slate-100">
                                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full w-fit mb-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{exp.status}</span>
                                            </div>
                                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{exp.role}</h3>
                                            <p className="text-indigo-600 font-bold text-lg">{exp.company}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                                            <Calendar size={14} /> {exp.duration}
                                        </div>
                                    </div>

                                    <ul className="space-y-5 mb-10">
                                        {exp.outcomes.map((bullet, bIdx) => (
                                            <li key={bIdx} className="flex gap-4 text-sm text-slate-600 leading-relaxed group">
                                                <Terminal size={16} className="mt-1 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                                                <span className="font-medium" dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<b class="text-slate-900">$1</b>') }} />
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 pt-8 border-t border-slate-50">
                                        {exp.tech.map(t => (
                                            <span key={t} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Analytics (4/12) - Filling the empty space */}
                                <div className="lg:col-span-4 p-10 bg-slate-50/50 flex flex-col items-center justify-center">
                                    <div className="w-full text-center mb-6">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resource_Mix</p>
                                        <p className="text-xs font-bold text-slate-900">Project Focus Distribution</p>
                                    </div>

                                    <div className="relative h-48 w-48">
                                        <Doughnut data={exp.chartData} options={chartOptions} />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            {idx === 0 ? <Cloud size={24} className="text-indigo-600" /> : <Brain size={24} className="text-indigo-600" />}
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                                        {exp.chartData.labels.map((label, i) => (
                                            <div key={label} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.chartData.datasets[0].backgroundColor[i] }} />
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* System Summary Footer */}
                {/* <div className="mt-16 p-8 bg-slate-900 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold tracking-tight">Technical Competency Verified</h4>
                                <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">SPPU | IT_ENGINEERING_CORE [cite: 8]</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest">
                                CGPA 7.4 [cite: 8]
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest">
                                HSC 88.67% [cite: 10]
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </section>
    );
};

export default Experience;