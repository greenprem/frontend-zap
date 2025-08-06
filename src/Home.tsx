import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { sendToDiscord } from './utils/sendToDiscord';

interface FormData {
  name: string;
  email: string;
  specialization: string;
  reason: string;
}

// Define specialization options type
type Specialization = 'avionics' | 'mechatronics' | 'software' | 'propulsion' | 'structures';

function Home() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [bottomWordIndex, setBottomWordIndex] = useState(0);
  const words = ['IMAGINE', 'BUILD', 'DEPLOY'];
  const [startBottomText, setStartBottomText] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Form state - moved inside the component
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    specialization: '',
    reason: ''
  });

  // Form handlers - moved inside the component
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.specialization || !formData.reason) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Format the message for Discord
      const message = `**New Application Received!**
      
**Name:** ${formData.name}
**Email:** ${formData.email}
**Specialization:** ${formData.specialization.toUpperCase()}
**Why they want to join:** ${formData.reason}`;

      await sendToDiscord(message, 'Application Form');
      alert('Application submitted successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        specialization: '',
        reason: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit application. Please try again.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {

    // Disable scrolling when animation starts
    document.body.style.overflow = 'hidden';
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Clear previous canvas
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Star field
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, sizeAttenuation: true });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    camera.position.z = 5;
    scene.background = new THREE.Color(0x000000);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/balloon.png', (texture) => {
      const balloonMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const balloon = new THREE.Sprite(balloonMaterial);
      balloon.scale.set(3, 3, 1);
      balloon.position.set(0, 5, 0);
      scene.add(balloon);

      const targetY = 1;
      const targetX = -3.5;
      const animationDuration = 4;
      const shiftDuration = 1;
      const totalDuration = animationDuration + shiftDuration;
      const startTime = Date.now();

      const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = (Date.now() - startTime) / 1000;

        starField.rotation.x += 0.0005;
        starField.rotation.y += 0.0005;

        if (elapsedTime < animationDuration) {
          const progress = 1 - Math.pow(1 - elapsedTime / animationDuration, 3);
          balloon.position.y = 5 - progress * (5 - targetY);
          balloon.position.x = Math.sin(elapsedTime * 1.5) * 0.1;
        } else if (elapsedTime < totalDuration) {
          const shiftProgress = (elapsedTime - animationDuration) / shiftDuration;
          const easedShift = 1 - Math.pow(1 - shiftProgress, 2);
          balloon.position.x = (1 - easedShift) * 0 + easedShift * targetX;
          balloon.position.y = targetY;
        } else {
          if (!animationComplete) {
            balloon.position.x = targetX;
            balloon.position.y = targetY;
            setAnimationComplete(true);
            setShowText(true); // trigger showing text
          }
          balloon.position.y = targetY + Math.sin(Date.now() / 1000) * 0.05;
          balloon.rotation.z = Math.sin(Date.now() / 1000) * 0.05;
        }

        renderer.render(scene, camera);
      };

      animate();
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!startBottomText) return;
  
    const interval = setInterval(() => {
      setBottomWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [startBottomText]);
  
  useEffect(() => {
    if (!showText || !textRef.current) return;
    
    
    
    const text = 'TEAM UDUPI';
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length && textRef.current) {
        textRef.current.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        setStartBottomText(true);       // existing bottom text trigger
        setShowScrollIndicator(true);   // new scroll indicator trigger
        
        // Re-enable scrolling when animation completes
        document.body.style.overflow = 'auto';
      }
    }, 100);
    
    // Cleanup function to ensure scrolling is re-enabled if component unmounts during animation
    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [showText]);
  
  
  // Animation for scroll-triggered elements
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NavigationBar />
      <div ref={mountRef} className="fixed top-0 left-0 w-full h-screen z-0" />
  
      {showText && (
        <div
          ref={textRef}
          className="absolute text-white font-bold overflow-hidden whitespace-nowrap"
          style={{
            top: '40%',
            left: 'calc(45% - 170px)',
            transform: 'translateY(-50%)',
            fontSize: '5vw',
            fontFamily: 'Orbitron',
            color: '#00bfff',
            textShadow: `
              0 0 1px #00bfff,
              0 0 1px #00bfff,
              0 0 6px #00bfff,
              0 0 0px #00bfff
            `,
            whiteSpace: 'nowrap',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        ></div>
      )}
      
      {startBottomText && (
        <div
          className="absolute w-full text-center"
          style={{
            bottom: '20%',
            fontSize: '3vw',
            fontWeight: 'bold',
            fontFamily: 'Orbitron',
            color: '#ffffff',
            textShadow: `
              0 0 1px #ffffff,
              0 0 1px #ffffff,
              0 0 8px #00bfff
            `,
            pointerEvents: 'none',
          }}
        >
          <span
            key={bottomWordIndex} // forces animation to re-trigger on word change
            className="fade-cycle inline-block"
          >
            {words[bottomWordIndex]}
          </span>
        </div>
      )}

      {/* Scroll indicator */}
      {showScrollIndicator && (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse" style={{ zIndex: 20 }}>
    <span className="text-cyan-500 text-sm mb-2 font-orbitron">SCROLL TO EXPLORE</span>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#00bfff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)}


      {/* Main content area starts here */}
      <div className="relative z-10 mt-screen">
        {/* Spacer for hero section */}
        {/* <div className="h-screen"></div> */}
        
        {/* About section */}
        <section className="relative py-24 bg-black bg-opacity-80 backdrop-filter backdrop-blur-md border-t border-cyan-500">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="scroll-animate fade-in-left">
                <h2 className="text-cyan-500 text-4xl mb-6 font-orbitron tracking-wider">ABOUT <span className="text-white">MISSION</span></h2>
                <div className="terminal-effect mb-6 p-6 border border-cyan-500 bg-black bg-opacity-60 relative">
                  <div className="terminal-header absolute top-0 left-0 right-0 bg-cyan-800 h-6 flex items-center px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="pt-6">
                    <span className="text-green-500"> </span>
                    <span className="text-white typing-effect">
                      Team Udupi is a collective of visionary engineers and scientists dedicated to pioneering the frontiers of technology and innovation. Our mission is to develop cutting-edge solutions that transcend conventional boundaries and redefine what's possible.
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="stat-box bg-black bg-opacity-60 border border-cyan-500 p-4 text-center hover:bg-cyan-900 hover:bg-opacity-20 transition-all duration-300">
                    <div className="text-3xl font-bold text-cyan-500">16</div>
                    <div className="text-white">Team Members</div>
                  </div>
                  <div className="stat-box bg-black bg-opacity-60 border border-cyan-500 p-4 text-center hover:bg-cyan-900 hover:bg-opacity-20 transition-all duration-300">
                    <div className="text-3xl font-bold text-cyan-500">10+</div>
                    <div className="text-white">Projects Completed</div>
                  </div>
                </div>
              </div>
              <div className="scroll-animate fade-in-right">
                <div className="retro-monitor border-4 border-gray-700 rounded-lg overflow-hidden bg-black p-4 relative">
                  <div className="scan-line absolute top-0 left-0 right-0 bottom-0 pointer-events-none"></div>
                  <div className="bg-gradient-to-br from-black to-gray-900 p-6 flex flex-col items-center justify-center">
                    <div className="retro-radar-container relative w-64 h-64 mb-4">
                      <div className="retro-radar-circle border-2 border-cyan-500 rounded-full w-full h-full"></div>
                      <div className="retro-radar-circle border border-cyan-500 rounded-full w-3/4 h-3/4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="retro-radar-circle border border-cyan-500 rounded-full w-1/2 h-1/2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="retro-radar-center w-2 h-2 bg-cyan-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="retro-radar-sweep"></div>
                    </div>
                    <div className="font-mono text-cyan-500 text-center">
                      <div>COORDINATES: 28.7492 °N, 77.1207 °E</div>
                      <div>STATUS: OPERATIONAL</div>
                      <div>SIGNAL STRENGTH: OPTIMAL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subsystems section */}
        <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 border-t border-cyan-500">
          <div className="tech-grid absolute inset-0 opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-center text-cyan-500 text-4xl mb-16 font-orbitron tracking-wider">OUR <span className="text-white">SUBSYSTEMS</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Avionics */}
              <div className="scroll-animate fade-in-up">
                <div className="subsystem-card border border-cyan-500 bg-black bg-opacity-70 p-6 rounded-sm relative overflow-hidden hover:translate-y-2 transition-all duration-300">
                  <div className="subsystem-glow absolute inset-0 bg-cyan-500 opacity-0 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="hex-icon bg-cyan-900 text-cyan-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl text-cyan-500 text-center mb-4 font-orbitron">AVIONICS</h3>
                    <div className="divider mb-4 h-px bg-cyan-500"></div>
                    <p className="text-white text-center">
                      Our avionics team specializes in cutting-edge flight control systems, sensors, and navigation technology that ensures precision and reliability in aerial operations.
                    </p>
                    <div className="tech-specs mt-6 text-sm text-cyan-300 font-mono">
                      <div className="flex justify-between">
                        <span>PRECISION RATING:</span>
                        <span>99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RESPONSE TIME:</span>
                        <span>3.2ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>REDUNDANCY:</span>
                        <span>TRIPLE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mechatronics */}
              <div className="scroll-animate fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="subsystem-card border border-cyan-500 bg-black bg-opacity-70 p-6 rounded-sm relative overflow-hidden hover:translate-y-2 transition-all duration-300">
                  <div className="subsystem-glow absolute inset-0 bg-cyan-500 opacity-0 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="hex-icon bg-cyan-900 text-cyan-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl text-cyan-500 text-center mb-4 font-orbitron">MECHATRONICS</h3>
                    <div className="divider mb-4 h-px bg-cyan-500"></div>
                    <p className="text-white text-center">
                      Integrating mechanical, electronic, and software engineering, our mechatronics division creates sophisticated robotic systems with unparalleled functionality.
                    </p>
                    <div className="tech-specs mt-6 text-sm text-cyan-300 font-mono">
                      <div className="flex justify-between">
                        <span>TORQUE CAPACITY:</span>
                        <span>230 N⋅m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SERVO PRECISION:</span>
                        <span>0.01°</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ACTUATOR TYPE:</span>
                        <span>QUANTUM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Software */}
              <div className="scroll-animate fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="subsystem-card border border-cyan-500 bg-black bg-opacity-70 p-6 rounded-sm relative overflow-hidden hover:translate-y-2 transition-all duration-300">
                  <div className="subsystem-glow absolute inset-0 bg-cyan-500 opacity-0 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="hex-icon bg-cyan-900 text-cyan-500 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                      </svg>
                    </div>
                    <h3 className="text-2xl text-cyan-500 text-center mb-4 font-orbitron">SOFTWARE</h3>
                    <div className="divider mb-4 h-px bg-cyan-500"></div>
                    <p className="text-white text-center">
                      Our software engineers develop advanced algorithms for machine learning, real-time control systems, and data processing that power all our technological innovations.
                    </p>
                    <div className="tech-specs mt-6 text-sm text-cyan-300 font-mono">
                      <div className="flex justify-between">
                        <span>PROCESS SPEED:</span>
                        <span>500 TFLOPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NEURAL LAYERS:</span>
                        <span>128</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ERROR RATE:</span>
                        <span>0.0002%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              
            </div>
          </div>
        </section>

        {/* Join Us section */}
        <section className="relative py-24 bg-black border-t border-cyan-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-cyan-500 text-4xl mb-6 font-orbitron tracking-wider">BECOME <span className="text-white">PART OF US</span></h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join our team of visionaries and pioneers as we push the boundaries of what's possible in aerospace engineering and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="scroll-animate fade-in-left">
                <div className="retro-terminal border-2 border-cyan-500 bg-black bg-opacity-80 p-6 relative">
                  <div className="terminal-header absolute top-0 left-0 right-0 bg-cyan-900 h-6 flex items-center px-2">
                    <div className="font-mono text-white text-xs">TEAM_UDUPI:/recruitment$ </div>
                  </div>
                  <div className="pt-8">
                    <div className="mb-4">
                      <span className="text-cyan-500">$</span>
                      <span className="text-white"> We're looking for exceptional minds to join our mission:</span>
                    </div>
                    <ul className="text-white space-y-4 ml-4">
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2"></span>
                        <span>Software Engineers with expertise in AI/ML</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2"></span>
                        <span>Avionics and Controls Specialists</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2"></span>
                        <span>Mechanical Design Engineers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2"></span>
                        <span>Propulsion System Developers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-500 mr-2"></span>
                        <span>Electrical Systems Engineers</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <span className="text-cyan-500">$</span>
                      <span className="text-white typing-effect"> Submit your application to join our elite team of innovators...</span>
                      <span className="cursor-blink">█</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scroll-animate fade-in-right">
                <form className="vintage-form space-y-6" onSubmit={handleSubmit}>
                  <div className="form-group border border-cyan-500 bg-black bg-opacity-70 p-1">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="NAME" 
                      className="w-full bg-transparent text-white p-3 outline-none font-mono" 
                      required
                    />
                  </div>
                  
                  <div className="form-group border border-cyan-500 bg-black bg-opacity-70 p-1">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="EMAIL" 
                      className="w-full bg-transparent text-white p-3 outline-none font-mono" 
                      required
                    />
                  </div>
                  
                  <div className="form-group border border-cyan-500 bg-black bg-opacity-70 p-1">
                    <select 
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-white p-3 outline-none font-mono"
                      required
                    >
                      <option value="" disabled>SELECT SPECIALIZATION</option>
                      <option value="avionics">AVIONICS</option>
                      <option value="mechatronics">MECHATRONICS</option>
                      <option value="software">SOFTWARE</option>
                      <option value="propulsion">PROPULSION</option>
                      <option value="structures">STRUCTURES</option>
                    </select>
                  </div>
                  
                  <div className="form-group border border-cyan-500 bg-black bg-opacity-70 p-1">
                    <textarea 
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="WHY DO YOU WANT TO JOIN?" 
                      className="w-full bg-transparent text-white p-3 outline-none font-mono h-32"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full border-2 border-cyan-500 bg-transparent text-cyan-500 py-3 font-orbitron hover:bg-cyan-500 hover:text-black transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">SUBMIT APPLICATION</span>
                    <div className="absolute inset-0 w-0 bg-cyan-500 group-hover:w-full transition-all duration-300"></div>
        
      </button>
    </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer and social links */}
        <Footer />
      </div>

      
    </>
  );
}

export default Home;