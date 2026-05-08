import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Layout, Code2, Database, Globe, Cloud, Terminal, X, Award, ExternalLink, Sun, Moon, LayoutGrid, User, Briefcase, Mail, ChevronDown, AtSign, Phone, MessageSquare, Zap, GraduationCap, Heart, Rocket, Target, Cpu, ShieldCheck, Users, Activity, CheckCircle2, FileText
} 
from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import profileImage from './DP.png';

const App = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [activePoint, setActivePoint] = useState(null);
  
  // States
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBioHubOpen, setIsBioHubOpen] = useState(false);
  const [isCareerHubOpen, setIsCareerHubOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('https://debasakta-portfolio-backend.onrender.com/api/reviews');
      const reviews = await res.json();
      setAllReviews(reviews);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setSelectedSection(null);
        setIsBioHubOpen(false);
        setIsCareerHubOpen(false);
      }
    };

    if (isMenuOpen || selectedSection || isBioHubOpen || isCareerHubOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, selectedSection, isBioHubOpen, isCareerHubOpen]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const modalData = {
    frontend: {
      title: "Frontend Development",
      description: "Expertise in building highly interactive SPAs using React and Angular. I leverage Redux for complex state management and Next.js for SEO-optimized applications.",
      tools: ["React", "Angular", "Next.js", "Redux", "Tailwind CSS"]
    },
    backend: {
      title: "Backend Architecture",
      description: "Specializing in Node.js and Express to build scalable, non-blocking architectures. I focus on clean middleware patterns and security headers.",
      tools: ["Node.js", "Express", "JWT Auth", "Socket.io"]
    },
    database: {
      title: "Data Modeling",
      description: "Proficient in both NoSQL and Relational databases. I use Mongoose for MongoDB schema validation and perform complex aggregations.",
      tools: ["MongoDB", "Mongoose", "PostgreSQL", "MySQL"]
    },
    api: {
      title: "API Design & Integration",
      description: "Designing RESTful services and GraphQL schemas that prioritize developer experience and robust error handling.",
      tools: ["REST", "GraphQL", "Postman", "Swagger"]
    },
    cloud: { 
      title: "Cloud & DevOps", 
      description: "Managing infrastructure on AWS, focusing on automated deployment pipelines (CI/CD) and high availability.", 
      tools: ["AWS", "Vercel", "Docker", "GitHub Actions"] 
    },
    calculator: {
      title: "Basic Calculator",
      description: `### README\nThis calculator is created using HTML, CSS and JavaScript.\n\n**Overview**\n(1) Addition Operation\n(2) Subtraction Operation\n(3) Multiplication Operation\n(4) Division Operation\n*All operations support decimal values.*\n\n(5) **Percentage Operation**: 1st the base number should be given. After tapping '%', enter the percentage in the prompt.\n\n(6) **Exponent Operation**: Input base number, tap '^', and enter power in the dialog.\n\n(7) **Square-root Operation**\n\n**Features**\n- Responsive design across all devices.`,
      tools: ["HTML5", "CSS3", "JavaScript"]
    },
    WebIDE: {
      title: "Codepen",
      description: "### README\nHTML, CSS, and JavaScript Editor: CodePen provides a code editor that supports HTML, CSS, and JavaScript. Users can write and edit code directly in the browser, making it easy to experiment with web development ideas.\n\n**Real-Time Preview:**\n- As you code, CodePen provides a real-time preview of your project. You can see how changes in your code affect the appearance and functionality of your web page immediately.\n- Cloudinary API for asset management\n- Redis for session caching",
      tools: ["React.js", "Redis", "WebRTC", "PostgreSQL"]
    }
  };

  const certifications = [
    { name: "Full-Stack Web Development", link: "https://www.udemy.com/certificate/UC-e0163029-03ff-40da-9fa3-a5ab06e2f283/" },
    { name: "Machine Learning A-Z: AI, Python & R + ChatGPT", link: "https://www.udemy.com/certificate/UC-6c6eea51-ac9e-47de-871e-54864445117f/" },
    { name: "Ultimate AWS Certified Developer", link: "https://www.udemy.com/certificate/UC-3267bc47-ea36-44bf-b74f-f63abf8d89e8/" },
    { name: "NVIDIA GenAI & LLMs", status: "In Progress" }
  ];

  const tapEffect = {
    scale: 0.95,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    transition: { duration: 0.1 }
  };
 const handleLoginSuccess = async (CredentialResponse) => {
    try {
      // Note: Added 'await' here to ensure stability
      const response = await fetch('https://debasakta-portfolio-backend.onrender.com/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: CredentialResponse.credential })
      });

      const data = await response.json();

      if (data.success) {
        console.log("Backend verified User", data.user);
        setIsLoggedIn(true);
        setShowLoginPrompt(false);
        
        // Storing everything we need for the review later
        setUserData({
          name: data.user.name,
          picture: data.user.picture,
          email: data.user.email
        });
      }
    } catch (error) {
      console.error("Failed to connect to backend:", error);
    }
  };
  const handleReviewSubmit = async () => {
    if (!comment.trim()) return alert("Please write a comment first!");

    try {
      const response = await fetch('https://debasakta-portfolio-backend.onrender.com/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
          comment: comment,
          rating: 5 
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Review saved to MongoDB Atlas! 🍃");
        setAllReviews([data.newReview || {
          _id: Date.now().toString(),
          comment : comment,
          picture : userData.picture,
          createdAt : new Date()
        }, ...allReviews]);
        setComment(""); 
      }
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };
  const currentYear = new Date().getFullYear();
  return (
    <div className={`${darkMode ? 'bg-[#030712] text-slate-200' : 'bg-slate-50 text-slate-900'} min-h-screen font-sans selection:bg-blue-500/30 relative overflow-x-hidden transition-colors duration-500`}>
      
      {/* Background Pattern */}
      <div className={`fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 ${darkMode ? 'opacity-20' : 'opacity-30'}`} />
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 origin-left z-[70]" style={{ scaleX }} />

      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 w-full backdrop-blur-xl z-50 border-b ${darkMode ? 'bg-[#030712]/80 border-white/5' : 'bg-white/80 border-black/5'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <span className={`text-xl font-bold tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-black'}`}>Debasakta<span className="text-blue-500">.</span></span>
          </div>

          <div className="flex items-center gap-4">
            <div className="space-x-8 hidden md:flex text-sm font-medium uppercase tracking-widest">
              <a href="#experience" className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'} transition-colors`}>Experience</a>
              <a href="#projects" className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'} transition-colors`}>Projects</a>
            </div>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-white/5 text-yellow-400 border border-white/10' : 'bg-black/5 text-blue-600 border border-black/10'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
              {isMenuOpen ? <X size={24} /> : <LayoutGrid size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hamburger Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={`fixed top-0 right-0 h-full w-72 z-[60] shadow-2xl p-10 pt-28 ${darkMode ? 'bg-[#0b1120] border-l border-white/5' : 'bg-white border-l border-black/5'}`}>
              <div className="flex flex-col gap-8 text-xs font-bold uppercase tracking-[0.25em]">
                <button onClick={() => { setIsBioHubOpen(true); setIsMenuOpen(false); }} className="hover:text-blue-500 transition-colors flex items-center gap-4 text-left w-full"><User size={18}/> Bio Hub</button>
                <button onClick={() => { setIsCareerHubOpen(true); setIsMenuOpen(false); }} className="hover:text-blue-500 transition-colors flex items-center gap-4 text-left w-full"><Briefcase size={18}/> Career</button>
                
                <div className="flex flex-col gap-4">
                  <button onClick={() => setActivePoint(activePoint === 'contact' ? null : 'contact')} className="hover:text-blue-500 transition-colors flex items-center justify-between w-full">
                    <span className="flex items-center gap-4"><Mail size={18}/> Contact</span>
                    <motion.div animate={{ rotate: activePoint === 'contact' ? 180 : 0 }}><ChevronDown size={14}/></motion.div>
                  </button>
                  <AnimatePresence>
                    {activePoint === 'contact' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-4 pl-9 overflow-hidden border-l border-blue-500/20 ml-2">
                        <a href="mailto:debasakta.dev@gmail.com" className="hover:text-blue-500 transition-colors text-[10px] lowercase flex items-center gap-2 font-mono italic tracking-normal"><AtSign size={12}/> debasakta.dev@gmail.com</a>
                        <a href="tel:+918658988750" className="hover:text-blue-500 transition-colors text-[10px] flex items-center gap-2 font-mono italic tracking-normal"><Phone size={12}/> +91 8658988750</a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="pt-2"><a href="/resume.pdf" download="Debasakt_Pati_Resume.pdf" 
                onClick={() => setIsMenuOpen(false)} 
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 border ${
                darkMode 
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20' 
                : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                }`}
                >
                <FileText size={18}/> 
                <span className="tracking-widest">Resume PDF</span>
                </a>
                </div>
                <a href="#review" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-500 transition-colors flex items-center gap-4"><MessageSquare size={18}/> Review</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 md:pt-0">
        <div className="max-w-6xl mx-auto w-full z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-6 w-fit mt-2">
                <Zap size={14} />
                <span>Ready for Series B/C Scale</span>
              </div>
              <h1 className={`text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-[1.1] md:leading-[0.9] ${darkMode ? 'text-white' : 'text-black'}`}>Full Stack <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Architect.</span></h1>
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-600 to-blue-200 bg-clip-text text-transparent">MERN Architecture & Scale</h2>
                <p className={`text-lg md:text-xl mb-10 font-light leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>I build production-ready systems where speed meets stability—with the same precision I use to hit an apex in Forza Horizon 5.</p>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-5">
                <motion.a href="https://github.com/debasakta" target="_blank" whileHover={{ y: -5 }} whileTap={tapEffect} className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold shadow-xl ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}><Code2 size={20} /> Github</motion.a>
                <motion.a href="mailto:debasakta.dev@gmail.com" whileHover={{ y: -5 }} whileTap={tapEffect} className={`flex items-center gap-3 border backdrop-blur-md px-8 py-4 rounded-2xl font-bold shadow-xl ${darkMode ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-black/10 bg-black/5 text-black hover:bg-black/10'}`}><Mail size={20} /> Email</motion.a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative group aspect-square md:aspect-auto md:h-[600px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] md:rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className={`relative h-full w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] border ${darkMode ? 'border-white/10 bg-[#030712]' : 'border-black/10 bg-white'}`}>
                <img src={profileImage} alt="Debasakta Pati" className={`w-full h-full object-cover transition-all duration-700 ${darkMode ? 'grayscale hover:grayscale-0' : 'hover:scale-105'}`} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FULL SCREEN BIO HUB WINDOW */}
      <AnimatePresence>
        {isBioHubOpen && (
          <motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={`fixed inset-0 z-[200] overflow-y-auto ${darkMode ? 'bg-[#030712]' : 'bg-white'}`}>
            <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-20' : 'opacity-5'}`} style={{ backgroundImage: 'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
            <div className="max-w-6xl mx-auto px-6 py-24 relative">
              <button onClick={() => setIsBioHubOpen(false)} className="fixed top-8 right-8 p-4 bg-blue-600 text-white rounded-full hover:rotate-90 transition-all z-[210] shadow-2xl"><X size={28} /></button>
              <header className="mb-20">
                <h2 className="text-blue-500 font-mono tracking-[0.3em] uppercase text-xs mb-4">Academic & Lifestyle Hub</h2>
                <h3 className={`text-5xl md:text-8xl font-bold tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>Beyond the code<span className="text-blue-600">.</span></h3>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-8 md:p-12 rounded-[2.5rem] border ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-slate-100 border-black/5'}`}>
                  <h4 className="text-2xl font-bold mb-10 flex items-center gap-4"><GraduationCap className="text-blue-500" size={32}/> Education</h4>
                  <div className="space-y-10">
                    <div><p className="font-bold text-xl text-blue-500">Bachelor of Technology in Computer Science and Engineering (Btech)</p><p className="text-slate-400 mt-1 italic">Dhaneswar Rath Institute of Engineering and Medical Science (DRIEMS) [2019-2023]</p></div>
                    <div><p className="font-bold text-xl text-blue-500" style={{marginTop: '11rem'}}>Intermediate in Science(12th)</p><p className="text-slate-400 mt-1 italic">Christ College, Cuttack [2017–2019]</p></div>
                  </div>
                </div>
                <div className={`p-8 md:p-12 rounded-[2.5rem] border ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-slate-100 border-black/5'}`}>
                  <h4 className="text-2xl font-bold mb-10 flex items-center gap-4"><Heart className="text-red-500" size={32}/> Interests & Roots</h4>
                  <div className="space-y-8 text-lg leading-relaxed opacity-90 italic">
                    <p>Deeply interested in the <span className="font-bold text-blue-400">intersection of Scalable Systems</span> and <span className="font-bold text-blue-400">User Experience</span>.</p>
                    <p>Excited about the possibilities in <span className="font-bold text-blue-400">Web Development</span> and <span className="font-bold text-blue-400">Mobile Technologies</span>.</p>
                    <p>Exploring the potential of <span className="font-bold text-blue-400">Artificial Intelligence</span> and its impact on our future.</p>
                    <p>When not building applications, I spend my time analyzing <span className="font-bold text-blue-400">open-source projects</span>, keeping up with <span className="font-bold text-blue-400">AI advancements</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN CAREER HUB WINDOW */}
      <AnimatePresence>
        {isCareerHubOpen && (
          <motion.div initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 150 }} className={`fixed inset-0 z-[200] overflow-y-auto ${darkMode ? 'bg-[#030712]' : 'bg-white'}`}>
            <div className={`absolute inset-0 pointer-events-none opacity-10 ${darkMode ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)]' : 'bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]'} bg-[size:30px_30px]`} />
            <div className="max-w-6xl mx-auto px-6 py-24 relative">
              <button onClick={() => setIsCareerHubOpen(false)} className="fixed top-8 right-8 p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-all z-[210] shadow-2xl"><X size={28} /></button>
              <header className="mb-20">
                <h2 className="text-blue-500 font-mono tracking-[0.3em] uppercase text-xs mb-4">Professional Blueprint</h2>
                <h3 className={`text-5xl md:text-8xl font-bold tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>About My Journey<span className="text-blue-600">.</span></h3>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-12">
                   <div className="space-y-6">
                      <p className={`text-2xl md:text-3xl leading-snug font-light ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        With <span className="text-blue-500 font-bold italic">3+ years</span> of technical experience, building the future with<span className="text-blue-500 font-bold italic"> MERN Stack</span>. 
                      </p>
                      <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        I don't just build websites; I engineer robust, user-centric applications that bridge the gap between complex logic and seamless experience.
                      </p>
                   </div>
                   <div className="flex flex-col gap-6">
                      <div className="flex gap-4 items-center p-4 border border-blue-500/10 rounded-2xl bg-blue-500/5">
                         <Rocket className="text-blue-500" size={24}/>
                         <span className="font-mono text-sm uppercase tracking-widest">Target: FULL-STACK ROLES & OPEN-SOURCE CONTRIBUTIONS</span>
                      </div>
                      <div className="flex gap-4 items-center p-4 border border-blue-500/10 rounded-2xl bg-blue-500/5">
                         <Target className="text-blue-500" size={24}/>
                         <span className="font-mono text-sm uppercase tracking-widest">Base: Bangalore Tech Ecosystem (Alternatively: Remote ready)</span>
                      </div>
                   </div>
                </div>
                <div className={`p-8 md:p-12 rounded-[2.5rem] border ${darkMode ? 'bg-white/[0.02] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-slate-100 border-black/5 shadow-xl'}`}>
                   <h4 className="text-xl font-bold mb-8 uppercase tracking-widest text-blue-500">Core Vision</h4>
                   <ul className="space-y-6">
                      {[
                        { icon: <Cpu size={20}/>, text: "Designing scalable backend architectures with Node.js and Express." },
                        { icon: <ShieldCheck size={20}/>, text: "Implementing production-grade security patterns and JWT strategies." },
                        { icon: <Users size={20}/>, text: "Committed to Open-Source contributions and collaborative development." },
                        { icon: <Activity size={20}/>, text: "Optimizing database performance for high-speed, zero-latency experiences." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start text-sm md:text-base italic leading-relaxed">
                          <span className="mt-1 text-blue-500">{item.icon}</span>
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{item.text}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content (Skills Grid) */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 md:overflow-visible no-scrollbar">
            {[
              { id: 'frontend', icon: <Layout size={24} />, label: 'Frontend', tags: ['React', 'Next.js'], text: 'text-blue-500', border: 'hover:border-blue-500/30' },
              { id: 'backend', icon: <Code2 size={24} />, label: 'Backend', tags: ['Node.js', 'Express'], text: 'text-emerald-500', border: 'hover:border-emerald-500/30' },
              { id: 'database', icon: <Database size={24} />, label: 'Database', tags: ['MongoDB', 'SQL'], text: 'text-purple-500', border: 'hover:border-purple-500/30' },
              { id: 'api', icon: <Globe size={24} />, label: 'API Section', tags: ['REST', 'GraphQL'], text: 'text-amber-500', border: 'hover:border-amber-500/30' },
              { id: 'cloud', icon: <Cloud size={24} />, label: 'Cloud/DevOps', tags: ['AWS', 'Docker'], text: 'text-cyan-500', border: 'hover:border-cyan-500/30' },
            ].map(item => (
              <motion.div key={item.id} onClick={() => setSelectedSection(item.id)} whileHover={{ y: -5 }} whileTap={tapEffect} className={`min-w-[150px] md:min-w-0 border p-6 rounded-2xl shadow-xl transition-all cursor-pointer ${darkMode ? 'bg-white/[0.03] border-white/5' : 'bg-white border-black/5'} ${item.border}`}>
                <div className={`${item.text} mb-4`}>{item.icon}</div>
                <h4 className={`font-bold mb-2 text-xs ${darkMode ? 'text-white' : 'text-blackkey'}`}>{item.label}</h4>
                <div className="flex gap-1 flex-wrap">
                  {item.tags.map(t => <span key={t} className={`text-[8px] font-mono px-2 py-0.5 rounded border uppercase ${darkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 relative scroll-mt-32">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div className={`backdrop-blur-3xl p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border shadow-2xl overflow-hidden ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5'}`}>
            <div className="flex items-center gap-4 md:gap-6 mb-16">
              <div className="p-3 md:p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-400"><Briefcase size={28} /></div>
              <h4 className={`text-2xl md:text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>Career Milestones</h4>
            </div>
            <div className={`relative pl-8 md:pl-12 border-l space-y-20 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <div className="relative">
                <div className="absolute -left-[41px] md:-left-[53px] top-2 w-4 h-4 rounded-full border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ backgroundColor: darkMode ? '#030712' : '#f8fafc' }} />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h5 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>Full Stack Developer</h5>
                    <p className="text-blue-400 font-mono text-xs md:text-sm mt-1">iTechBees Digital Solutions • 2023 – Present </p>
                  </div>
                  <span className={`text-[10px] font-mono border px-3 py-1 rounded-full uppercase tracking-widest ${darkMode ? 'text-slate-500 border-white/10' : 'text-slate-400 border-black/10'}`}>Core Experience</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {["Architecting dynamic web applications and managing end-to-end development using the MERN stack.",
                   "Enhancing data exchange efficiency through structured code and optimized database queries.", 
                   "Implementing robust authentication frameworks and role-based access controls for secure enterprise environments.", 
                   "Collaborating with UI/UX and QA teams within Agile workflows to deliver production-ready features.",
                   "Managing version control, containerization, and automated deployment pipelines for consistent application delivery."]
                   .map((text, i) => (
                    <li key={i} className={`flex gap-3 text-base md:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}><span className="text-blue-500 mt-1.5">•</span> {text}</li>
                  ))}
                </ul>
                <div className={`border rounded-2xl md:rounded-[2.5rem] p-6 md:p-12 transition-all ${darkMode ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]' : 'bg-black/[0.01] border-black/5 hover:bg-black/[0.03]'}`}>
                    <h6 className={`text-lg md:text-2xl font-bold mb-8 uppercase tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>Enterprise-Grade – <span className="text-blue-400">E-commerce Architecture</span></h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[{ t: "Platform Engineering", d: "Architected a scalable MERN ecosystem to handle high-traffic product catalogs and concurrent user sessions." }, 
                      { t: "Security", d: "Engineered a robust Auth system featuring RBAC, JWT rotation, and secure cookie handling for enterprise security." }, 
                      { t: "Frontend & UI", d: "Crafted a high-performance frontend using React & Redux Toolkit, ensuring seamless state management and a responsive, mobile-first UI with Tailwind CSS." }, 
                      { t: "API Development", d: "Designed and documented robust RESTful & GraphQL APIs using Swagger, optimized for fast data retrieval and seamless third-party integration." }, 
                      { t: "Payment", d: "Implemented secure, PCI-compliant payment workflows using Stripe and PayPal, featuring automated webhooks for real-time transaction tracking." }, 
                      { t: "DevOps", d: "Streamlined deployment using Docker & Kubernetes orchestration on AWS, leveraging S3 for assets and EC2 for resilient hosting." }, 
                      { t: "CI/CD", d: "Automated the delivery pipeline with Jenkins & GitHub Actions, ensuring zero-downtime deployments and consistent code quality checks." }, 
                      { t: "Performance", d: "Achieved a 30% boost in system response time by implementing Redis Caching, image optimization, and component-level lazy loading." }]
                      .map((item, idx) => (
                      <div key={idx} className="space-y-1 border-l-2 border-blue-500/20 pl-4">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">{item.t}</span>
                        <p className={`text-xs md:text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <div className={`backdrop-blur-3xl p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border shadow-2xl ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5'}`}>
            <h4 className={`text-2xl md:text-3xl font-bold mb-10 flex items-center gap-4 ${darkMode ? 'text-white' : 'text-black'}`}><Award size={28} className="text-purple-400" /> Certifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div key={index} onClick={() => cert.link && window.open(cert.link, "_blank")} whileTap={tapEffect} className={`group p-5 border rounded-2xl transition-all cursor-pointer flex justify-between items-center ${darkMode ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]' : 'bg-black/[0.02] border-black/5 hover:bg-black/[0.04]'}`}>
                  <div className="flex flex-col">
                    <span className={`group-hover:text-blue-500 font-medium text-sm md:text-base ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{cert.name}</span>
                    {cert.status && <span className="text-[10px] text-amber-500 font-mono mt-1 uppercase">{cert.status}</span>}
                  </div>
                  {cert.link && <ExternalLink size={14} className="text-slate-500 group-hover:text-purple-400" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <div className={`backdrop-blur-3xl p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border shadow-2xl ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5'}`}>
            <h4 className={`text-2xl md:text-3xl font-bold mb-16 flex items-center gap-4 ${darkMode ? 'text-white' : 'text-black'}`}><Terminal size={28} className="text-emerald-400" /> Open Source</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['calculator', 'WebIDE'].map(id => (
                <motion.div key={id} onClick={() => setSelectedSection(id)} whileTap={tapEffect} className={`group p-8 rounded-3xl border transition-all cursor-pointer ${darkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/30' : 'bg-slate-50 border-black/5 hover:border-emerald-500/30'}`}>
                  <h6 className={`text-xl font-bold mb-4 uppercase ${darkMode ? 'text-white' : 'text-black'}`}>{id === 'calculator' ? 'Basic Calculator' : 'Codepen'}</h6>
                  <p className="text-slate-500 text-sm mb-6 italic">Industrial grade architecture with optimized performance logic.</p>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded uppercase">View README</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Modal */}
      <AnimatePresence>
        {selectedSection && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#030712]/95 backdrop-blur-xl" onClick={() => setSelectedSection(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`max-w-2xl w-full border p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] relative shadow-2xl max-h-[85vh] overflow-y-auto ${darkMode ? 'bg-white/[0.05] border-white/10' : 'bg-white border-black/10'}`} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedSection(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <h2 className={`text-2xl md:text-4xl font-bold mb-6 uppercase tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>{modalData[selectedSection].title}</h2>
              <div className={`text-sm md:text-lg leading-relaxed mb-10 font-light whitespace-pre-wrap italic ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{modalData[selectedSection].description}</div>
              <div className="flex flex-wrap gap-2">
                {modalData[selectedSection].tools.map(tool => (
                  <span key={tool} className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/10 font-mono text-[10px] uppercase">{tool}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- COMMUNITY REVIEW SECTION --- */}
<section id="review" className="py-20 px-6 relative scroll-mt-32">
  <div className="max-w-4xl mx-auto">
    <div className={`backdrop-blur-3xl p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border shadow-2xl transition-all duration-500 ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-black/5'}`}>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-400">
          <MessageSquare size={28} />
        </div>
        <h4 className={`text-2xl md:text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>
          Community Feedback
        </h4>
      </div>
      
      {!isLoggedIn ? (
        /* PHASE 1: THE TAP TARGET */
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => setShowLoginPrompt(true)}
          className={`cursor-pointer p-12 border-2 border-dashed rounded-[2.5rem] transition-all text-center group ${darkMode ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-black/5 hover:bg-black/10'}`}
        >
          {!showLoginPrompt ? (
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-light text-slate-400 italic">
                "Tap here to leave a review on the architecture..."
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Verification Required
              </p>
            </div>
          ) : (
            /* PHASE 2: THE GOOGLE BUTTON */
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
              <p className="text-sm font-mono text-blue-400 uppercase tracking-widest">Verify with Google to continue</p>
              <GoogleLogin 
                onSuccess={handleLoginSuccess} 
                onError={() => console.log('Login Failed')}
                useOneTap 
                theme={darkMode ? "dark" : "outline"}
                shape="pill"
              />
              <button 
                onClick={(e) => { e.stopPropagation(); setShowLoginPrompt(false); }} 
                className="text-[10px] text-slate-500 underline uppercase tracking-tighter hover:text-white"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        /* PHASE 3: THE ACTUAL REVIEW FORM */
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Authenticated as {userData?.name}</span>
          </div>
          
          <textarea 
            className={`w-full p-8 rounded-[2rem] border outline-none focus:border-blue-500 transition-all text-lg font-light leading-relaxed ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-black/10 text-black'}`}
            placeholder="What do you think of the tech stack or the UI/UX?..."
            value = {comment}
            onChange={(e) => setComment(e.target.value)}
            rows="5"
          />
          
          <motion.button 
            onClick={handleReviewSubmit}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-colors"
          >
            Submit Your Review
          </motion.button>
        </motion.div>
      )}
      {/* --- LIVE FEED COMPONENT --- */}
      <div className="mt-16 pt-10 border-t border-white/5">
        {/* Header with Pulsing Status */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="space-y-1">
            <h5 className={`text-lg font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              Community Log
            </h5>
            <p className="text-[10px] text-blue-500/60 font-mono tracking-widest uppercase">
              {allReviews.length} Records Verified
            </p>
          </div>
          <div className="flex gap-1.5 bg-blue-500/5 p-2 rounded-full border border-blue-500/10">
             {[1,2,3].map(i => (
               <div 
                 key={i} 
                 className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-pulse" 
                 style={{ animationDelay: `${i * 0.2}s` }} 
               />
             ))}
          </div>
        </div>

        {/* Scrollable List */}
        <div className="grid grid-cols-1 gap-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
          {allReviews.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/5 rounded-[2rem]">
              <p className="text-slate-500 font-light italic">The ledger is currently empty. Waiting for input...</p>
            </div>
          ) : (
            allReviews.map((rev) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                key={rev._id} 
                className={`p-7 rounded-[2.5rem] border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10' 
                    : 'bg-black/[0.01] border-black/5 hover:bg-black/[0.03] hover:border-black/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={rev.picture} 
                      className="w-10 h-10 rounded-full border-2 border-blue-500/20 shadow-xl shadow-blue-500/5" 
                      alt="Reviewer" 
                    />
                    <div>
                      <p className={`text-sm font-bold tracking-tight ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {rev.name}
                      </p>
                      <p className="text-[9px] font-mono opacity-40 uppercase tracking-tighter">
                        Node: {rev._id.substring(rev._id.length - 8)}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className={`text-base font-light leading-relaxed italic ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{rev.comment}"
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
</section>

      <footer className={`py-12 text-center border-t ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
  {/* Social Icons (ତୋର ପୁରୁଣା Icons) */}
  <div className="flex justify-center gap-8 mb-6 text-slate-600">
    <a href="https://github.com/debasakta" target="_blank" rel="noreferrer">
      <Code2 size={22} className="hover:text-blue-500 transition-colors" />
    </a>
    <a href="mailto:debasakta.dev@gmail.com">
      <Mail size={22} className="hover:text-blue-500 transition-colors" />
    </a>
  </div>

  {/* Name & Title (SEO ପାଇଁ ଏବଂ professional look ପାଇଁ) */}
  <div className="mb-4">
    <h2 className={`text-lg font-bold tracking-widest uppercase ${darkMode ? 'text-white' : 'text-slate-800'}`}>
      DEBSAKTA PATI
    </h2>
    <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-blue-500 mt-1">
      Full Stack Developer
    </p>
  </div>

  {/* Locations (ତୋର ପୁରୁଣା Line) */}
  <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-slate-500 mb-6">
    Cuttack • Bangalore • India
  </p>

  {/* Copyright Section (ନୂଆ ଯୋଡ଼ା ହେଲା) */}
  <div className="pt-6 border-t border-white/5 w-1/2 mx-auto">
    <p className="text-[10px] text-slate-600 tracking-wider">
      © {currentYear} | Designed & Built by Debsakta Pati
    </p>
  </div>
</footer>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
};

export default App;