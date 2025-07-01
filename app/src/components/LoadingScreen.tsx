import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const matrix = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const MatrixLine = styled.div<{ delay: number }>`
  position: absolute;
  top: -100%;
  left: ${props => props.delay * 2}%;
  width: 2px;
  height: 100%;
  background: linear-gradient(transparent, #00ff88, transparent);
  animation: ${matrix} 3s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const LoadingText = styled(motion.div)`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  color: #00ff88;
  text-shadow: 0 0 10px #00ff88;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(0, 255, 136, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #00cc6a);
  border-radius: 2px;
`;

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      {[...Array(50)].map((_, i) => (
        <MatrixLine key={i} delay={i * 0.1} />
        ))}
      
      <LoadingText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        INITIALIZING SYSTEM...
      </LoadingText>
      
      <ProgressBar>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </ProgressBar>
      
      <motion.div
        style={{ color: '#00ff88', marginTop: '1rem', fontFamily: 'monospace' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(progress)}% COMPLETE
      </motion.div>
    </LoadingContainer>
  );
};

export default LoadingScreen; 