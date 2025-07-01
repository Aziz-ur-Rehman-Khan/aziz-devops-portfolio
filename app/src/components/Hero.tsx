import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal, Code, Server } from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 2rem;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  color: #00ff88;
  text-shadow: 0 0 20px #00ff88;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.h2)`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  color: #fff;
  margin-bottom: 2rem;
  font-weight: 300;
`;

const Description = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff88, #00cc6a);
  border: none;
  padding: 1rem 2rem;
  font-family: 'Orbitron', monospace;
  font-size: 1.1rem;
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  margin: 0 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #00ff88;
  cursor: pointer;
`;

const FloatingIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  color: rgba(0, 255, 136, 0.1);
  font-size: 2rem;
`;

interface HeroProps {
  onSectionChange?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['DevOps Engineer', 'Cloud Architect', 'Infrastructure Specialist'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { icon: Terminal, x: 10, y: 20, delay: 0 },
    { icon: Code, x: 80, y: 30, delay: 1 },
    { icon: Server, x: 20, y: 70, delay: 2 },
    { icon: Terminal, x: 70, y: 80, delay: 3 },
  ];

  const handleScrollToAbout = () => {
    if (onSectionChange) {
      onSectionChange('about');
    } else {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <HeroSection id="home">
      <FloatingIcons>
        {floatingIcons.map((item, index) => (
        <FloatingIcon
            key={index}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay, duration: 1 }}
        >
            <item.icon size={40} />
        </FloatingIcon>
        ))}
      </FloatingIcons>

      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AZIZ UR REHMAN KHAN
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {texts[currentText]}
          </motion.span>
        </Subtitle>
        
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experienced DevOps Engineer with expertise in AWS, GCP, and Azure. 
          Specializing in infrastructure as code, CI/CD pipelines, and cloud-native solutions.
        </Description>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToAbout}
          >
            EXPLORE PORTFOLIO
          </CTAButton>
        </motion.div>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ y: 5 }}
        onClick={handleScrollToAbout}
      >
        <ChevronDown size={30} />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 