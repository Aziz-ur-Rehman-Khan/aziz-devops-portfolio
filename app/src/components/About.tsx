import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Target, Zap, Shield, Rocket, Code } from 'lucide-react';
import contentService from '../services/contentService';

interface About {
  summary: string;
  whatIDo: {
    title: string;
    description: string;
  }[];
  philosophy: string;
  closing: string;
  strengths: string[];
  contact?: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    medium: string;
  };
}

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 136, 0.6); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 255, 136, 0.08));
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #00ff88;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px #00ff88;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 5rem;
  color: #ccc;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  font-weight: 300;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProfileCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  animation: ${glow} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00cc6a, #00ff88);
    animation: ${float} 4s ease-in-out infinite;
  }

  &:hover {
    border-color: rgba(0, 255, 136, 0.6);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
`;

const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 204, 102, 0.1));
  border: 2px solid rgba(0, 255, 136, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const ProfileTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #00ff88;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 10px #00ff88;
`;

const NormalText = styled.p`
  color: #ffffff;
  font-weight: 400;
  font-size: 1.05rem;
  line-height: 1.7;
  letter-spacing: 0.01em;
  font-family: 'Inter', 'Orbitron', monospace, sans-serif;
  margin: 0 0 1rem 0;
`;

const StrengthsCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00cc6a, #00ff88);
    animation: ${float} 4s ease-in-out infinite;
  }

  &:hover {
    border-color: rgba(0, 255, 136, 0.6);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
  }
`;

const StrengthsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
`;

const StrengthsIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 204, 102, 0.1));
  border: 2px solid rgba(0, 255, 136, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const StrengthsTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #00ff88;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 10px #00ff88;
`;

const StrengthsSubtitle = styled.p`
  color: #ccc;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 300;
`;

const StrengthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StrengthItem = styled(motion.div)`
  background: rgba(0, 255, 136, 0.08);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(0, 255, 136, 0.12);
    border-color: rgba(0, 255, 136, 0.4);
    transform: translateX(8px);

    &::before {
      left: 100%;
    }
  }
`;

const StrengthIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid rgba(0, 255, 136, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StrengthText = styled.span`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #00ff88;
  font-size: 2rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: #ff6b6b;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 107, 107, 0.3);
`;

const WhatIDoList = styled.ul`
  padding-left: 1.2rem;
  margin: 0;
`;

const NormalListItem = styled.li`
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 400;
  font-size: 1.05rem;
  line-height: 1.7;
  letter-spacing: 0.01em;
  font-family: 'Inter', 'Orbitron', monospace, sans-serif;
`;

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const data = await contentService.fetchAboutData();
        setAboutData(data);
      } catch (err) {
        setError('Failed to load about data');
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <AboutSection>
        <Container>
          <LoadingContainer>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '3rem' }}
            >
              ⚡
            </motion.div>
          </LoadingContainer>
        </Container>
      </AboutSection>
    );
  }

  if (error || !aboutData) {
    return (
      <AboutSection>
        <Container>
          <ErrorContainer>
            <h3>Error Loading About</h3>
            <p>{error}</p>
          </ErrorContainer>
        </Container>
      </AboutSection>
    );
  }

  const strengthIcons = [Zap, Shield, Rocket, Code];

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          ABOUT ME
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Sr. DevOps Engineer passionate about cloud infrastructure and automation
        </SectionSubtitle>

        <MainContent>
          <ProfileCard
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <ProfileHeader>
              <ProfileIcon>
                <User />
              </ProfileIcon>
              <div>
                <ProfileTitle>ABOUT ME</ProfileTitle>
              </div>
            </ProfileHeader>
            <NormalText>{aboutData.summary}</NormalText>
            <div style={{ margin: '2rem 0 1rem' }}>
              <ProfileTitle style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>What I Do</ProfileTitle>
              <WhatIDoList>
                {aboutData.whatIDo && aboutData.whatIDo.map((item, idx) => (
                  <NormalListItem key={idx}>
                    <strong>{item.title}:</strong> {item.description}
                  </NormalListItem>
                ))}
              </WhatIDoList>
            </div>
            <NormalText style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#00ff88' }}>
              {aboutData.philosophy}
            </NormalText>
            <NormalText style={{ marginTop: '1rem', fontWeight: 500, color: '#00ff88' }}>
              {aboutData.closing}
            </NormalText>
          </ProfileCard>

          <StrengthsCard
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <StrengthsHeader>
              <StrengthsIcon>
                <Target />
              </StrengthsIcon>
              <div>
                <StrengthsTitle>CORE STRENGTHS</StrengthsTitle>
                <StrengthsSubtitle>Key competencies & expertise</StrengthsSubtitle>
              </div>
            </StrengthsHeader>
            <StrengthsGrid>
              {aboutData.strengths.map((strength, index) => {
                const IconComponent = strengthIcons[index % strengthIcons.length];
                return (
                  <StrengthItem
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <StrengthIcon>
                      <IconComponent size={24} />
                    </StrengthIcon>
                    <StrengthText>{strength}</StrengthText>
                  </StrengthItem>
                );
              })}
            </StrengthsGrid>
          </StrengthsCard>
        </MainContent>
      </Container>
    </AboutSection>
  );
};

export default About; 