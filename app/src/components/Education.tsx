import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import contentService from '../services/contentService';

interface Education {
  degree: string;
  school: string;
  period: string;
  location: string;
  description: string[];
}

const EducationSection = styled.section`
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

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EducationCard = styled(motion.div)`
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

const EducationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const EducationIcon = styled.div`
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

const EducationInfo = styled.div`
  flex: 1;
`;

const DegreeTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ff88;
  margin: 0 0 0.5rem 0;
`;

const SchoolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const SchoolName = styled.span`
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

const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await contentService.getResumeData();
        setEducationData({
          degree: data.education.degree,
          school: data.education.school,
          period: data.education.period,
          location: 'Lahore, Pakistan',
          description: [
            'Graduated with strong foundation in computer science principles',
            'Developed expertise in cloud computing and software project management',
            'Gained hands-on experience with modern software development methodologies',
            'Completed comprehensive studies in software engineering and system architecture'
          ]
        });
      } catch (err) {
        setError('Failed to load education data');
        console.error('Error fetching education data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <EducationSection>
        <Container>
          <LoadingContainer>
            <div className="animate-spin" style={{ fontSize: '2rem' }}>⚡</div>
          </LoadingContainer>
        </Container>
      </EducationSection>
    );
  }

  if (error || !educationData) {
    return (
      <EducationSection>
        <Container>
          <ErrorContainer>
            <h3>Error Loading Education</h3>
            <p>{error}</p>
          </ErrorContainer>
        </Container>
      </EducationSection>
    );
  }

  return (
    <EducationSection id="education" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          EDUCATION
        </SectionTitle>

        <EducationGrid>
          <EducationCard
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <EducationHeader>
              <EducationIcon>
                <GraduationCap />
              </EducationIcon>
              <EducationInfo>
                <DegreeTitle>{educationData.degree}</DegreeTitle>
                <SchoolInfo>
                  <SchoolName>{educationData.school}</SchoolName>
                  <Period>
                    <Calendar size={14} />
                    {educationData.period}
                  </Period>
                  <Location>
                    <MapPin size={14} />
                    {educationData.location}
                  </Location>
                </SchoolInfo>
              </EducationInfo>
            </EducationHeader>
            
            <DescriptionList>
              {educationData.description.map((item, index) => (
                <DescriptionItem key={index}>
                  {item}
                </DescriptionItem>
              ))}
            </DescriptionList>
          </EducationCard>
        </EducationGrid>
      </Container>
    </EducationSection>
  );
};

export default Education; 