const NavigationBar = () => {
  return (
    <nav className="fixed top-0 left-20 right-20 z-10 bg-black/80 backdrop-blur-md border border-cyan-400/20 shadow-2xl shadow-purple-500/20 rounded-2xl mx-4 z-50">
      <div className="px-6 py-2 flex items-center justify-between min-h-[60px]">
        <div className="flex items-center space-x-3">
          <img src="logo.png" alt="Team Udupi Logo" className="w-14 h-14 object-contain flex-shrink-0" />
          <h1 className="text-cyan-300 font-extrabold text-2xl font-mono tracking-widest funky-text" style={{fontFamily: "'Orbitron', cursive, sans-serif"}}>
             TEAM<span className="text-purple-400"> UDUPI</span>
          </h1>
        </div>

        <div className="hidden md:flex space-x-6">
          <a
            href="/"
            className="text-cyan-200 hover:text-white font-mono text-sm transition-all duration-300 hover:scale-110"
          >
            HOME
          </a>
          <a
            href="/mission"
            className="text-cyan-200 hover:text-white font-mono text-sm transition-all duration-300 hover:scale-110"
          >
            MISSION
          </a>
          <a
            href="/crew"
            className="text-cyan-200 hover:text-white font-mono text-sm transition-all duration-300 hover:scale-110"
          >
            CREW
          </a>
          <a
            href="/contact"
            className="text-cyan-200 hover:text-white font-mono text-sm transition-all duration-300 hover:scale-110"
          >
            CONTACT
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <div className="text-xs text-cyan-300 font-mono tracking-wide">SYSTEM ONLINE</div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;