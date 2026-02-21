const Hero = () => {
    return (
        <>
            <section className="font-poppins flex flex-col items-center justify-center min-h-[80vh] px-6 pt-30 md:pt-20 lg:pt-24">
                <div className="max-w-3xl text-center space-y-6">

                    {/* The Greeting */}
                    <p className="text-indigo-600 font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
                        Full Stack Developer
                    </p>

                    {/* The Main Intro */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1]">
                        I'm <span className="text-indigo-600">Aman Mujawar</span>. <br />
                        Crafting clean digital <br className="hidden md:block" />
                        experiences with precision.
                    </h1>

                    {/* The Subtext */}
                    <p className="font-robort text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
                        Focused on building minimalist, high-performance UIs
                        that bridge the gap between complex logic and
                        human-centered design. 🚀
                    </p>

                    {/* Scroll Indicator (Subtle) */}
                    <div className="pt-14 flex justify-center">
                        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-600 to-transparent animate-bounce" />
                    </div>

                </div>
            </section>
        </>
    );
};

export default Hero;