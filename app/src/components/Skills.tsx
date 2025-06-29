import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Cloud, Code, Database, Monitor } from 'lucide-react';
import contentService from '../services/contentService';

interface Skill {
  name: string;
  percentage: number;
  category: string;
  icon?: string;
}

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 255, 136, 0.05));
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #00ff88;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px #00ff88;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #ccc;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 255, 136, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #00ff88;
  font-size: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ff88;
  margin: 0;
`;

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
`;

const SkillPercentage = styled.span`
  color: #00ff88;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled(motion.div)<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #00cc6a);
  border-radius: 4px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #00ff88;
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: #ff6b6b;
  padding: 2rem;
`;

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Cloud Platforms':
      return <Cloud />;
    case 'Infrastructure as Code':
      return <Code />;
    case 'CI/CD Tools':
      return <Zap />;
    case 'Containerization':
      return <Database />;
    case 'Security':
      return <Shield />;
    case 'Monitoring':
      return <Monitor />;
    default:
      return <Code />;
  }
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await contentService.fetchSkillsData();
        setSkills(data);
      } catch (err) {
        setError('Failed to load skills');
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <SkillsSection>
        <Container>
          <LoadingContainer>
            <div className="animate-spin" style={{ fontSize: '2rem' }}>⚡</div>
          </LoadingContainer>
        </Container>
      </SkillsSection>
    );
  }

  if (error) {
    return (
      <SkillsSection>
        <Container>
          <ErrorContainer>
            <h3>Error Loading Skills</h3>
            <p>{error}</p>
          </ErrorContainer>
        </Container>
      </SkillsSection>
    );
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          TECHNICAL SKILLS
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Expertise across cloud platforms, infrastructure, and DevOps tools
        </SectionSubtitle>

        <SkillsGrid>
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <SkillCategory
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <CategoryHeader>
                <CategoryIcon>
                  {getCategoryIcon(category)}
                </CategoryIcon>
                <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
              </CategoryHeader>

              {categorySkills.map((skill, skillIndex) => (
                <SkillItem key={skillIndex}>
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillPercentage>{skill.percentage}%</SkillPercentage>
                  </SkillHeader>
                  <ProgressBar>
                    <ProgressFill
                      percentage={skill.percentage}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                    />
                  </ProgressBar>
                </SkillItem>
              ))}
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 