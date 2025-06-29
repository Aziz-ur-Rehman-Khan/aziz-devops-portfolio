import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Resume from './components/Resume';
import MatrixBackground from './components/MatrixBackground';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  color: #fff;
  position: relative;
  overflow-x: hidden;
`;

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact', 'resume'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppContainer>
      <MatrixBackground />
      <Header currentSection={currentSection} />
      
      <AnimatePresence>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </AnimatePresence>
    </AppContainer>
  );
};

export default App; 