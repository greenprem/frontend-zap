const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-cyan-500 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-cyan-500 text-xl mb-4 font-orbitron">TEAM UDUPI</h3>
                <p className="text-gray-400">
                  Pioneering the future through innovation and engineering excellence since 2020.
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-cyan-500 text-xl mb-4 font-orbitron">CONTACT</h3>
                <div className="text-gray-400 space-y-2">
                  <div className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>TEAM UDUPI, DTU, DELHI</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                    </svg>
                    <span>+91 93547 59630</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>teamcansat@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-cyan-500 text-xl mb-4 font-orbitron">QUICK LINKS</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="/" className="hover:text-cyan-500 transition-colors">HOME BASE</a></li>
                  <li><a href="/mission" className="hover:text-cyan-500 transition-colors">ABOUT MISSION</a></li>
                  <li><a href="#" className="hover:text-cyan-500 transition-colors">SUBSYSTEMS</a></li>
                  <li><a href="#" className="hover:text-cyan-500 transition-colors">JOIN US</a></li>
                  {/* <li><a href="#" className="hover:text-cyan-500 transition-colors">GALLERY</a></li> */}
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-cyan-500 text-xl mb-4 font-orbitron">FOLLOW US</h3>
                <div className="flex space-x-4 justify-center md:justify-start">
                  <a href="https://www.instagram.com/cansat_dtu/" className="w-10 h-10 border border-cyan-500 rounded-full flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/team-udupi" className="w-10 h-10 border border-cyan-500 rounded-full flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
                <div className="mt-6 text-center md:text-left">
                  <div className="text-gray-400 text-sm">Subscribe to our transmissions</div>
                  <div className="mt-2 flex">
                    <input type="email" placeholder="YOUR EMAIL" className="bg-transparent border border-cyan-500 text-white p-2 w-full outline-none font-mono text-sm" />
                    <button className="bg-cyan-500 text-black px-4 font-bold">SEND</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 TEAM UDUPI. ALL RIGHTS RESERVED. COORDINATES: 28.7492 °N, 77.1207 °E
              </p>
            </div>
          </div>
        </footer>
  );
};

export default Footer;
