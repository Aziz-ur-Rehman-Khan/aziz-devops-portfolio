import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building } from 'lucide-react';
import contentService from '../services/contentService';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements: string[];
}

const ExperienceSection = styled.section`
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

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #00ff88, #00cc6a);
    transform: translateX(-50%);

  @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(0, 255, 136, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }

  @media (max-width: 768px) {
    margin-left: 40px;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ExperienceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  color: #00ff88;
  font-size: 1.8rem;
`;

const ExperienceInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.8rem;
  font-weight: 600;
  color: #00ff88;
  margin: 0 0 0.5rem 0;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const CompanyName = styled.span`
  color: #00ff88;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Period = styled.span`
  color: #ccc;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Location = styled.span`
  color: #ccc;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const DescriptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const DescriptionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #fff;
  margin-bottom: 0.8rem;
  line-height: 1.6;

  &::before {
    content: '▸';
    color: #00ff88;
    font-weight: bold;
    margin-top: 0.2rem;
  }
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const TechnologyTag = styled.span`
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(0, 255, 136, 0.2);
`;

const AchievementsList = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 136, 0.2);
`;

const AchievementsTitle = styled.h4`
  color: #00ff88;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Orbitron', monospace;
`;

const AchievementItem = styled.div`
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    font-size: 0.8rem;
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

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchExperiences = async () => {
    try {
      setLoading(true);
        const data = await contentService.fetchExperienceData();
        setExperiences(data);
    } catch (err) {
        setError('Failed to load experience');
      console.error('Error fetching experience:', err);
    } finally {
      setLoading(false);
    }
  };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <ExperienceSection>
        <Container>
          <LoadingContainer>
            <div className="animate-spin" style={{ fontSize: '2rem' }}>⚡</div>
          </LoadingContainer>
        </Container>
      </ExperienceSection>
    );
  }

  if (error) {
    return (
      <ExperienceSection>
        <Container>
          <ErrorContainer>
            <h3>Error Loading Experience</h3>
            <p>{error}</p>
          </ErrorContainer>
        </Container>
      </ExperienceSection>
    );
  }

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          EXPERIENCE
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My journey in DevOps engineering and cloud infrastructure
        </SectionSubtitle>

          <Timeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
                key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              >
              <ExperienceHeader>
                <ExperienceIcon>
                  <Building />
                </ExperienceIcon>
                <ExperienceInfo>
                  <JobTitle>{experience.title}</JobTitle>
                  <CompanyInfo>
                    <CompanyName>{experience.company}</CompanyName>
                    <Period>
                      <Calendar size={14} />
                      {experience.period}
                    </Period>
                    <Location>
                      <MapPin size={14} />
                      {experience.location}
                    </Location>
                  </CompanyInfo>
                </ExperienceInfo>
              </ExperienceHeader>
                  
              <DescriptionList>
                {experience.description.map((desc, descIndex) => (
                  <DescriptionItem key={descIndex}>
                    {desc}
                  </DescriptionItem>
                    ))}
              </DescriptionList>

              <TechnologiesList>
                {experience.technologies.map((tech, techIndex) => (
                  <TechnologyTag key={techIndex}>{tech}</TechnologyTag>
                ))}
              </TechnologiesList>

              <AchievementsList>
                <AchievementsTitle>
                  🏆 KEY ACHIEVEMENTS
                </AchievementsTitle>
                {experience.achievements.map((achievement, achievementIndex) => (
                  <AchievementItem key={achievementIndex}>
                    {achievement}
                  </AchievementItem>
                      ))}
              </AchievementsList>
            </ExperienceCard>
            ))}
          </Timeline>
      </Container>
    </ExperienceSection>
  );
};

export default Experience; 