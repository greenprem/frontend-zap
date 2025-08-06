import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { sendToDiscord } from './utils/sendToDiscord';

const Contact = () => {
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Delay map loading for performance
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      name: "Kumar Manas",
      position: "Team Captain",
      email: "kumarmanassingh2021@gmail.com",
      phone: "+91 93547 59630",
      image: "/assets/team/commander.png"
    },
    {
      name: "Pratham Gupta",
      position: "Team Vice Captain",
      email: "prathamgupta9001@gmail.com",
      phone: "+91 76528 02989",
      image: "/assets/team/scientist.png"
    },
    {
      name: "Nithya Ajayan",
      position: "Team Co-Head",
      email: "nithyaajayan3@gmail.com",
      phone: "+91 85905 29154",
      image: "/assets/team/engineer.png"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Format the message for Discord
      const discordMessage = `
🚀 **New Contact Form Submission - Team Udupi**

**Name:** ${formData.name}
**Email:** ${formData.email}
**Subject:** ${formData.subject}

**Message:**
${formData.message}

---
*Sent from Team Udupi Contact Form*
      `.trim();

      await sendToDiscord(discordMessage, "Team Udupi Contact Form");
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black bg-opacity-90 text-white" style={{ 
      backgroundImage: "url('/assets/stars-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <NavigationBar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-28">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-white inline-block text-transparent bg-clip-text mb-4 font-orbitron" >CONTACT</h1>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions about our mission or want to join Team Udupi? Reach out to our team members directly or send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500 mb-4">
                  <div className="w-full h-full bg-gradient-to-b from-blue-600 to-cyan-400 flex items-center justify-center text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-1">{member.name}</h3>
                <p className="text-gray-400 mb-4">{member.position}</p>
                
                <div className="w-full space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex-shrink-0 text-cyan-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a href={`mailto:${member.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                      {member.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex-shrink-0 text-cyan-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a href={`tel:${member.phone}`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Get In Touch</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900 bg-opacity-50 border border-green-500 rounded-lg">
                <p className="text-green-400">✅ Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg">
                <p className="text-red-400">❌ Failed to send message. Please check all fields and try again.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-400 mb-2">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Message Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Headquarters</h2>
              
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-6 h-6 mt-1 flex-shrink-0 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300">
                    Team Udupi, PB-F, Delhi Technological University, Bawana, New Delhi - 110042<br />
                    Udupi, Karnataka 576101<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-6 h-6 mt-1 flex-shrink-0 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-gray-300">+91 93547 59630</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 mt-1 flex-shrink-0 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:contact@teamudupi.space" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  contact@teamudupi.space
                </a>
              </div>
            </div>
            
            <div className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg overflow-hidden h-64">
              {showMap ? (
                 <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674127436892!2d77.11854641508236!3d28.749276182363587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQ0JzU3LjQiTiA3N8KwMDcnMTQuNyJF!5e0!3m2!1sen!2sin!4v1716133049821!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-cyan-400 animate-pulse">Loading map...</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text mb-6">Join Our Mission</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Ready to become part of Team Udupi? We're always looking for passionate individuals to join our space exploration journey.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
            Apply Now
          </button>
        </div>
      </main>
      
      <Footer/>
    </div>
  );
};

export default Contact;