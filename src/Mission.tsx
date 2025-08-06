import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
// Mock NavigationBar component

const Missions = () => {
  const [activeTab, setActiveTab] = useState('achievements');

  // Mission categories
  const achievements = [
    {
      id: "astroverse",
      title: "Astroverse Internship",
      date: "January - February 2024",
      status: "completed",
      type: "Project Work",
      description: "Undertook a one-month internship with Astroverse, designing and building a functional CanSat named ALKA capable of collecting and transmitting real-time sensor data.",
      highlights: [
        "Built ALKA CanSat with environmental parameter measurement",
        "Real-time data transmission to ground station",
        "Live presentation at Nainital to Astroverse team",
        "Measured pressure, temperature, acceleration, and velocity"
      ],
      color: "from-purple-500 to-blue-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: "national-cansat",
      title: "National CanSat Competition",
      date: "April 2024",
      status: "completed",
      type: "Competition",
      description: "First-ever CanSat team from Delhi Technological University shortlisted for the prestigious National CanSat Competition by ISRO and IN-SPACe.",
      highlights: [
        "First DTU team to be shortlisted",
        "Advanced ULKA CanSat with AI/ML object detection",
        "Custom two-stage parachute system",
        "Direct interaction with ISRO Chairman S. Somanath"
      ],
      color: "from-orange-500 to-red-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      id: "sih",
      title: "Smart India Hackathon",
      date: "September 2024",
      status: "completed",
      type: "Hackathon",
      description: "Advanced drone project with AI/ML-based real-time AQI analysis, transforming standard UAV into intelligent environmental monitoring system.",
      highlights: [
        "AI/ML-based real-time AQI analysis",
        "Intelligent environmental monitoring system",
        "Institutional finals qualification",
        "Interdisciplinary design recognition"
      ],
      color: "from-green-500 to-teal-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: "nasa-space-apps",
      title: "NASA Space Apps Challenge",
      date: "October 2024",
      status: "completed",
      type: "Competition",
      description: "Participated in NASA Space Apps Challenge at Bhimtal, developing innovative solution addressing space science and sustainability themes.",
      highlights: [
        "Silver Medals at regional level",
        "Selected as Global Nominee by NASA",
        "Interdisciplinary engineering and data science approach",
        "International recognition for innovation"
      ],
      color: "from-cyan-500 to-blue-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: "india-space-week",
      title: "India Space Week Internship",
      date: "July 2024 - January 2025",
      status: "completed",
      type: "Project Work",
      description: "Extensive six-month journey in satellite development, progressing through structured learning curve with three distinct platforms.",
      highlights: [
        "Developed ALKA (basic CanSat for training)",
        "Advanced ULKA with AI-enabled data capture",
        "Conceptualized JWALA compact CubeSat",
        "Explored complete space mission lifecycle"
      ],
      color: "from-indigo-500 to-purple-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "cansat-workshop",
      title: "CanSat Workshop",
      date: "December 2024",
      status: "completed",
      type: "Workshop",
      description: "Organized three-day hands-on workshop on CanSat development, introducing students to satellite systems fundamentals.",
      highlights: [
        "Three-day hands-on workshop format",
        "End-to-end CanSat building experience",
        "Payload design and sensor calibration training",
        "Community building for space enthusiasts"
      ],
      color: "from-yellow-500 to-orange-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "aries-visit",
      title: "ARIES Observatory Visit",
      date: "April 2025",
      status: "completed",
      type: "Educational",
      description: "Transformative visit to Aryabhatta Research Institute of Observational Sciences in Nainital, witnessing cutting-edge astronomical instrumentation.",
      highlights: [
        "Witnessed 4-meter International Liquid Mirror Telescope",
        "Exclusive workshop on solar physics and space science",
        "Interactions with ARIES researchers and engineers",
        "Team bonding through stargazing and hill treks"
      ],
      color: "from-pink-500 to-red-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];

  const ongoingProjects = [
    {
      id: "rocket-payload",
      title: "1km Altitude Rocket Payload",
      date: "March 2025 - Ongoing",
      status: "ongoing",
      type: "Competition",
      description: "Developing specialized CanSat payload for national model rocketry competition organized by IN-SPACe and ISRO, in collaboration with Team Rocketry DTU.",
      highlights: [
        "Engineered for high-altitude mechanical stress",
        "Real-time atmospheric data transmission",
        "Two-stage descent system for controlled recovery",
        "Automated audio beacon for retrieval"
      ],
      color: "from-red-500 to-pink-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-9 5 9M12 2v20M5 12l7-7 7 7M8 21l4-7 4 7" />
        </svg>
      )
    },
    {
      id: "turksat",
      title: "TÜRKSAT Model Satellite Competition",
      date: "March 2025 - Ongoing",
      status: "ongoing",
      type: "Competition",
      description: "Preparing for TÜRKSAT Model Satellite Competition 2025-2026, competing in Category 1: Multi-Spectral Mechanical Filtering Module.",
      highlights: [
        "Multi-spectral imaging capabilities",
        "Mechanical filtering module design",
        "Advanced engineering precision requirements",
        "Global stage competition representation"
      ],
      color: "from-blue-500 to-indigo-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: "national-cansat-2025",
      title: "National CanSat Competition 2025",
      date: "April 2025 - Ongoing",
      status: "ongoing",
      type: "Competition",
      description: "Working on advanced CanSat version for ISRO InSpace Annual National CanSat Competition with significant performance upgrades.",
      highlights: [
        "Aerobraking descent mechanism implementation",
        "Increased telemetry range capabilities",
        "Enhanced structural design for robustness",
        "Improved data collection and monitoring"
      ],
      color: "from-cyan-500 to-blue-600",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const allMissions = activeTab === 'achievements' ? achievements : ongoingProjects;

  return (
    <div className="min-h-screen flex flex-col bg-black bg-opacity-90 text-white" style={{ 
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3), transparent 50%)",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <NavigationBar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-28">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-orbitron bg-clip-text mb-4">OUR MISSIONS</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore Team Udupi's journey through space technology development, competitions, and groundbreaking achievements.
          </p>
        </div>

        {/* Mission Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 bg-opacity-50 rounded-lg p-2 border border-cyan-800">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-8 py-3 rounded-md transition-all duration-300 font-semibold ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                  : 'text-cyan-400 hover:bg-cyan-500 hover:bg-opacity-10'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-8 py-3 rounded-md transition-all duration-300 font-semibold ${
                activeTab === 'ongoing'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                  : 'text-cyan-400 hover:bg-cyan-500 hover:bg-opacity-10'
              }`}
            >
              Ongoing Projects
            </button>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {allMissions.map((mission, index) => (
            <div 
              key={mission.id} 
              className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              {/* Mission Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${mission.color} p-3 rounded-lg`}>
                    {mission.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-1">
                      {mission.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {mission.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    mission.status === 'completed' 
                      ? 'bg-green-500 bg-opacity-20 text-green-400' 
                      : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                  }`}>
                    {mission.status === 'completed' ? 'COMPLETED' : 'ONGOING'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500 bg-opacity-20 text-cyan-400">
                    {mission.type.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Mission Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {mission.description}
              </p>

              {/* Mission Highlights */}
              <div>
                <h4 className="text-cyan-400 font-semibold mb-3">Key Highlights:</h4>
                <ul className="space-y-2">
                  {mission.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Bar for Ongoing Projects */}
              {mission.status === 'ongoing' && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-cyan-400 font-semibold">Progress</span>
                    <span className="text-sm text-gray-400">In Development</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse" style={{width: `${60 + (index * 10)}%`}}></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mission Stats */}
        <div className="bg-gray-900 bg-opacity-50 border border-cyan-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text mb-8 text-center">Mission Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">{achievements.length}</div>
              <div className="text-gray-400">Completed Missions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{ongoingProjects.length}</div>
              <div className="text-gray-400">Ongoing Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">3</div>
              <div className="text-gray-400">CanSat Variants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">2</div>
              <div className="text-gray-400">Global Recognitions</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text mb-6">Join Our Next Mission</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of Team Udupi's journey to push the boundaries of space technology and exploration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
              Collaborate With Us
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-cyan-500 rounded-md shadow-sm text-lg font-medium text-cyan-400 hover:bg-cyan-500 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
              View Project Gallery
            </button>
          </div>
        </div>
      </main>
      
            <Footer />
        </div>
    );
}
export default Missions;