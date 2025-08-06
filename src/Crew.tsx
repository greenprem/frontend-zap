import React from "react";

const Crew = () => {
  // Subsystems definitions
  const subsystems = [
    {
      id: "Mechanical",
      name: "Mechanatronics",
      description: "Strategic planning and mission operations oversight for Team Udupi's space endeavors.",
      color: "from-blue-500 to-purple-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      id: "Avionics",
      name: "Avionics",
      description: "Designing and constructing advanced spacecraft systems and infrastructure.",
      color: "from-cyan-500 to-blue-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: "Software",
      name: "Software",
      description: "Conducting cutting-edge research and experiments in space environments.",
      color: "from-green-500 to-teal-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  // Team members data with consistent image paths
  const teamMembers = [
    {
      name: "Kumar Manas",
      position: "Team Captain",
      subsystem: "Mechanical",
      image: "manas.jpg"
    },
    {
      name: "Shreshtha Gandhi",
      position: "Mechanical Head",
      subsystem: "Mechanical",
      image: "gandhi.png"
    },
    {
      name: "Pratham Gupta",
      position: "Member",
      subsystem: "Mechanical",
      image: "pratham1.jpg"
    },
    {
      name: "Yateen Kumar",
      position: "Member",
      subsystem: "Mechanical",
      image: "yateen.jpg"
    },
    {
      name: "Pratham Gupta",
      position: "Team Vice Captain",
      subsystem: "Avionics",
      image: "pratham.png"
    },
    {
      name: "Priyanshu Verma",
      position: "Avionics Head",
      subsystem: "Avionics",
      image: "priyanshu.jpg"
    },
    {
      name: "Aaryan Sachdeva",
      position: "Team Head",
      subsystem: "Avionics",
      image: "aaryan.jpg"
    },
    {
      name: "Nithya Ajayan",
      position: "Team Co-Head",
      subsystem: "Avionics",
      image: "nithya.jpg"
    },
    {
      name: "Adishree Sahoo",
      position: "Member",
      subsystem: "Avionics",
      image: "sahoo.jpg"
    },
    {
      name: "Nakul",
      position: "Member",
      subsystem: "Avionics",
      image: "nakul.jpg"
    },
    {
      name: "Ayush Thakur",
      position: "Member",
      subsystem: "Avionics",
      image: "ayush.jpg"
    },
    {
      name: "Saksham Sharma",
      position: "Member",
      subsystem: "Avionics",
      image: "saksham.jpg"
    },
    {
      name: "Harshit Nanda",
      position: "Member",
      subsystem: "Avionics",
      image: "harshit.jpg"
    },
    {
      name: "Navya",
      position: "Member",
      subsystem: "Avionics",
      image: "navya.jpg"
    },
    {
      name: "Maanit Arora",
      position: "Software Head",
      subsystem: "Software",
      image: ""
    },
    {
      name: "Prem Kumar",
      position: "Member",
      subsystem: "Software",
      image: "prem.jpg"
    }
  ];

  // Image error handler - shows initials if image fails to load
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="min-h-screen flex flex-col bg-black bg-opacity-90 text-white" style={{ 
      backgroundImage: "url('/assets/stars-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      {/* Navigation would go here */}
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-28">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold inline-block bg-clip-text mb-4 font-orbitron">OUR CREW</h1>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated professionals of Team Udupi, working together to push the boundaries of space exploration.
          </p>
        </div>

        {/* Display each subsystem with its team members */}
        {subsystems.map((subsystem) => {
          // Get team members for this subsystem
          const subsystemMembers = teamMembers.filter(member => member.subsystem === subsystem.id);
          
          return (
            <div key={subsystem.id} className="mb-20">
              {/* Subsystem Header */}
              <div className="mb-10">
                <div className="flex items-center mb-6 space-x-4">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text">
                    {subsystem.name}
                  </h2>
                </div>
              </div>
              
              {/* Team Members Grid - Now with actual images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                {subsystemMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center"
                  >
                    {/* Profile Image Container */}
                    <div className="relative w-24 h-24  mb-4 overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 rounded-lg">
                      {/* Actual Image */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                      {/* Fallback - Initials (hidden by default) */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-b from-blue-600 to-cyan-400 flex items-center justify-center text-2xl font-bold text-white"
                        style={{ display: 'none' }}
                      >
                        {member.name.split(' ').map(n => n.charAt(0)).join('')}
                      </div>
                    </div>
                    
                    {/* Name & Position */}
                    <h3 className="text-lg font-bold text-cyan-400 text-center mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-center text-sm">
                      {member.position}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Join the Team Section */}
        <div className="text-center mb-12 mt-16">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text mb-6">Join Our Mission</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Team Udupi is always looking for talented individuals passionate about space exploration to join our crew.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
              View Open Positions
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-cyan-500 rounded-md shadow-sm text-lg font-medium text-cyan-400 hover:bg-cyan-500 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
              Internship Program
            </button>
          </div>
        </div>
      </main>
      
      {/* Footer would go here */}
    </div>
  );
};

export default Crew;