import TechStackDynamic from '../components/TechStackDynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-medium text-slate-900 dark:text-white font-mono">
              <span className="text-emerald-600 dark:text-emerald-400">&gt;&gt;</span>
              {" "}welcome to my digital space
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                About
              </a>
              <a href="#skills" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                Skills
              </a>
              <a href="#projects" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                Projects
              </a>
              <a href="#contact" className="nav-link text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 font-mono">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                  <span className="w-8 h-px bg-emerald-600 dark:bg-emerald-400"></span>
                  <span>Welcome to my digital space</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight font-mono">
                  Hi! I&apos;m{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 glitch-text" data-text="Nguyen Sy Nguyen">
                    Nguyen Sy Nguyen
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-mono">
                  I am a Software Engineering student, and my greatest passion is{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    creating products
                  </span>{" "}
                  that meet real-world needs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 text-center inline-flex items-center justify-center group font-mono"
                >
                  <span>View Projects</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 px-8 py-4 rounded-lg font-medium transition-all duration-300 text-center font-mono"
                >
                  Contact Me
                </a>
              </div>

              {/* Tech Stack Preview */}
              <div className="pt-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">My Tech Stack:</span>
                  <div className="w-8 h-px bg-emerald-600 dark:bg-emerald-400"></div>
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-500 font-mono mb-4">
                  Explore the technologies I work with →
                </p>
              </div>
            </div>

            {/* Right Interactive Tech Stack */}
            <div className="relative lg:h-screen flex items-center justify-center">
              <TechStackDynamic />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              About Me
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Hello! I&apos;m a passionate Software Engineering student with a love for creating beautiful, 
                functional, and user-friendly digital experiences. I specialize in full-stack development 
                and enjoy turning complex problems into simple, elegant solutions.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                My expertise spans across frontend frameworks like React and Next.js, backend technologies 
                including Node.js, and programming languages such as TypeScript, JavaScript, Java, and C. 
                I&apos;m always eager to learn new technologies and apply them to real-world projects.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-4 py-2 rounded-full text-sm font-medium">
                  Problem Solver
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  Full-Stack Developer
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                  Tech Enthusiast
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Location:</strong> Vietnam
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Status:</strong> Software Engineering Student
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Focus:</strong> Full-stack Development
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Passion:</strong> Building Real-World Solutions
                  </span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600">
                <p className="text-sm text-slate-500 dark:text-slate-400 italic font-mono">
                  &ldquo;Code is like humor. When you have to explain it, it&apos;s bad.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
