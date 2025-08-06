import React, { useState, useEffect } from 'react';
import { BrainCircuit, ListChecks, ArrowRight, Code, GitCommit, Bot, ChevronRight, Menu, X, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Main App Component
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define the words you want to rotate
  const rotatingWords = ['Actionable Plan', 'Insights', 'Action', 'Impact', 'Success'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordOpacity, setWordOpacity] = useState(1);

  // Use a useEffect to handle the word rotation
  useEffect(() => {
    const totalIntervalTime = 3000; // 3 seconds for the full cycle
    const fadeOutTime = 700; // Match this with the CSS transition duration
    
    const interval = setInterval(() => {
      // Step 1: Start fading out
      setWordOpacity(0);

      // Step 2: After the fade-out transition, change the word and fade it back in
      const changeWordTimeout = setTimeout(() => {
        setCurrentWordIndex(prevIndex => (prevIndex + 1) % rotatingWords.length);
        setWordOpacity(1);
      }, fadeOutTime); 

      // Cleanup function for the timeout
      return () => clearTimeout(changeWordTimeout);

    }, totalIntervalTime);

    // Cleanup function for the interval
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Handle button click for cursor and animation
  const handleButtonClick = () => {
    setIsButtonActive(true);
    // Simulate a short loading process
    setTimeout(() => {
      setIsButtonActive(false);
      // Navigate to login page after simulation
      navigate('/login'); 
      console.log('Navigating to login page...');
    }, 1500); 
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'About', href: '#about' },
  ];

  const theme = {
    colors: {
      background: '#0a192f', // Navy Blue
      primary: '#00c6ff',     // Bright Cyan/Blue
      text: '#ccd6f6',
      textLight: '#8892b0',
      card: '#112240',
      border: '#1e2d50',
    },
  };

  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }} 
         className={`min-h-screen font-sans antialiased ${isButtonActive ? 'cursor-wait' : 'cursor-default'}`}>
      {/* Navbar */}
      <nav style={{ backgroundColor: theme.colors.card, borderBottom: `1px solid ${theme.colors.border}` }} className="sticky top-0 z-50 px-4 sm:px-8 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot size={30} style={{ color: theme.colors.primary }} />
            <span className="text-2xl font-bold tracking-tight">AppScribe</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-300" style={{color: theme.colors.textLight}}>{link.name}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => navigate('/login')} className="text-sm font-medium hover:text-white transition-colors duration-300 cursor-pointer" style={{color: theme.colors.textLight}}>
              Log In
            </button>
            <button 
              onClick={handleButtonClick}
              className="text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{ backgroundColor: theme.colors.primary, color: '#0a192f' }}
            >
              Sign Up Free
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4 items-center">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-300" style={{color: theme.colors.textLight}} onClick={() => setIsMenuOpen(false)}>{link.name}</a>
              ))}
              <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="text-sm font-medium hover:text-white transition-colors duration-300 cursor-pointer" style={{color: theme.colors.textLight}}>
                Log In
              </button>
              <button 
                onClick={() => { handleButtonClick(); setIsMenuOpen(false); }}
                className="w-full text-sm font-medium px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: theme.colors.primary, color: '#0a192f' }}
              >
                Sign Up Free
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-8 py-20 sm:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              From Client Survey to <span key={rotatingWords[currentWordIndex]} className="inline-block transition-opacity duration-700 ease-in-out" style={{ color: theme.colors.primary, opacity: wordOpacity }}>{rotatingWords[currentWordIndex]}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl max-w-xl mx-auto md:mx-0" style={{ color: theme.colors.textLight }}>
              AppScribe AI generates intelligent surveys to perfectly capture client needs, then automatically builds your entire project backlog. Stop guessing, start building.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              {/* Button with animated arrow on hover and new click animation */}
              <button 
                onClick={handleButtonClick}
                className="font-bold px-8 py-4 rounded-md flex items-center justify-center gap-2 group transform hover:scale-105 cursor-pointer"
                style={{
                  color: isButtonActive ? theme.colors.text : theme.colors.background,
                  background: `linear-gradient(to right, ${theme.colors.card}, ${theme.colors.primary} 50%, ${theme.colors.primary} 50%)`,
                  backgroundSize: '200% 100%',
                  backgroundPosition: isButtonActive ? 'left' : 'right',
                  transition: 'background-position 0.5s, color 0.5s',
                }}
              >
                Get Started for Free 
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              {/* Button with new hover style */}
              <button 
                className="font-bold px-8 py-4 rounded-md transition-all duration-300 border hover:bg-white hover:bg-opacity-10 cursor-pointer"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Request a Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
            <HeroAnimation theme={theme} />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24" style={{ backgroundColor: theme.colors.card }}>
          <div className="container mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">The Ultimate AI Co-pilot for Your Projects</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textLight }}>
              Stop juggling docs, tickets, and status updates. Let our AI handle the project management overhead.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ClipboardCheck size={32} style={{ color: theme.colors.primary }} />}
                title="Intelligent Client Surveys"
                description="Our AI generates a dynamic survey for your client. Their answers directly build the project's foundation, ensuring nothing gets lost in translation."
                theme={theme}
              />
              <FeatureCard
                icon={<BrainCircuit size={32} style={{ color: theme.colors.primary }} />}
                title="Automated Task Generation"
                description="Instantly convert the client's survey responses into a detailed project backlog with logical tasks, epics, and user stories."
                theme={theme}
              />
              <FeatureCard
                icon={<GitCommit size={32} style={{ color: theme.colors.primary }} />}
                title="Intelligent Progress Tracking"
                description="Sync with your Git commits to automatically track task progress and predict potential delays before they happen."
                theme={theme}
              />
            </div>
          </div>
        </section>
        
        {/* Workflow Section */}
        <section id="workflow" className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textLight }}>
                    A simple, powerful three-step process to automate your development lifecycle.
                </p>
                <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 hidden md:block" style={{backgroundColor: theme.colors.border}}></div>
                    <div className="absolute top-0 left-1/2 w-0.5 h-full md:hidden" style={{backgroundColor: theme.colors.border}}></div>
                    
                    <WorkflowStep
                        icon={<ClipboardCheck size={40} />}
                        step="1"
                        title="Survey"
                        description="Launch an AI-generated survey to capture your client's vision."
                        theme={theme}
                    />
                    <ChevronRight size={40} className="hidden md:block mx-8 text-gray-600 z-10" />
                    <WorkflowStep
                        icon={<ListChecks size={40} />}
                        step="2"
                        title="Plan"
                        description="Our AI converts answers into a complete project plan."
                        theme={theme}
                    />
                    <ChevronRight size={40} className="hidden md:block mx-8 text-gray-600 z-10" />
                    <WorkflowStep
                        icon={<Code size={40} />}
                        step="3"
                        title="Execute"
                        description="Code and watch your progress update automatically."
                        theme={theme}
                    />
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-24" style={{ backgroundColor: theme.colors.card }}>
            <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <div className="p-8 rounded-lg transition-transform transform hover:-translate-y-2" style={{backgroundColor: theme.colors.background}}>
                        <Code size={40} className="mb-4" style={{color: theme.colors.primary}}/>
                        <h3 className="text-2xl font-bold">Built for Developers, by Developers</h3>
                        <p className="mt-4" style={{color: theme.colors.textLight}}>
                            We understand the pain of endless clarification emails and vague project briefs. AppScribe AI was born from the desire to create a source of truth from the very start, ensuring you and your client are always aligned. Our goal is to make project management feel less like a chore and more like an integrated part of your development environment.
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <ChevronRight className="mt-1 flex-shrink-0" style={{color: theme.colors.primary}}/>
                            <span><span className="font-bold">Eliminate Ambiguity:</span> Start with crystal-clear requirements captured directly from the client.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <ChevronRight className="mt-1 flex-shrink-0" style={{color: theme.colors.primary}}/>
                            <span><span className="font-bold">Improve Client Communication:</span> Automatically generate clear progress reports based on the initial plan.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <ChevronRight className="mt-1 flex-shrink-0" style={{color: theme.colors.primary}}/>
                            <span><span className="font-bold">Integrate Seamlessly:</span> Connects with your favorite tools like GitHub, GitLab, and Slack.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: theme.colors.background, borderTop: `1px solid ${theme.colors.border}` }}>
        <div className="container mx-auto px-4 sm:px-8 text-center" style={{ color: theme.colors.textLight }}>
          <p>&copy; {new Date().getFullYear()} AppScribe AI. All rights reserved.</p>
          <p className="text-sm mt-2">Built to help developers reclaim their time.</p>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const FeatureCard = ({ icon, title, description, theme }) => (
  <div className="p-8 rounded-lg text-left transition-transform transform hover:-translate-y-2" style={{ backgroundColor: theme.colors.background }}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p style={{ color: theme.colors.textLight }}>{description}</p>
  </div>
);

const WorkflowStep = ({ icon, step, title, description, theme }) => (
    <div className="flex flex-col items-center text-center p-6 z-10 w-full sm:w-auto" style={{backgroundColor: theme.colors.background}}>
      <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: theme.colors.card, color: theme.colors.primary, border: `2px solid ${theme.colors.primary}`}}>
        {icon}
      </div>
      <span className="text-sm font-bold mb-2" style={{color: theme.colors.primary}}>STEP {step}</span>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm" style={{color: theme.colors.textLight}}>{description}</p>
    </div>
);


const HeroAnimation = ({ theme }) => {
  const initialTasks = [
    { id: 1, text: 'Create API endpoint for users' },
    { id: 2, text: 'Build hero section component' },
    { id: 3, text: 'Design database schema' },
    { id: 4, text: 'Implement user authentication' },
  ];
  const [completedIndex, setCompletedIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedIndex(prevIndex => {
        // If we've completed all tasks, reset
        if (prevIndex === initialTasks.length - 1) {
          return -1;
        }
        // Otherwise, move to the next task
        return prevIndex + 1;
      });
    }, 2000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once

  const progress = ((completedIndex + 1) / initialTasks.length) * 100;

  return (
    <div className="w-full max-w-md p-6 rounded-xl shadow-2xl" style={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.border}` }}>
      <div className="flex items-center mb-4">
        <ClipboardCheck size={20} className="mr-3" style={{ color: theme.colors.textLight }} />
        <p className="font-mono text-sm" style={{ color: theme.colors.textLight }}>client_survey_results.json</p>
      </div>
      <div className="w-full h-px mb-4" style={{ backgroundColor: theme.colors.border }}></div>
      <div className="space-y-3">
        {initialTasks.map((task, index) => (
          <div
            key={task.id}
            className={`flex items-center p-3 rounded-md transition-all duration-500 ${index <= completedIndex ? 'opacity-50' : 'opacity-100'}`}
            style={{ backgroundColor: theme.colors.background }}
          >
            <div
              className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 border-2 transition-all duration-500 ${index <= completedIndex ? 'bg-green-400 border-green-400' : ''}`}
              style={{ borderColor: theme.colors.primary }}
            ></div>
            <p className={`text-sm transition-all duration-500 ${index <= completedIndex ? 'line-through' : ''}`} style={{ color: theme.colors.text }}>
              {task.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-sm mb-2" style={{ color: theme.colors.textLight }}>Project Progress</p>
        <div className="w-full h-4 rounded-full" style={{ backgroundColor: theme.colors.background }}>
          <div
            className="h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: theme.colors.primary }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
