import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Globe, Folder, RefreshCw } from 'lucide-react';
import contentService from '../services/contentService';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  image?: string;
  category: string;
  achievements: string[];
}

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(0, 255, 136, 0.5);
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProjectIcon = styled.div`
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

const ProjectTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ff88;
  margin: 0;
`;

const ProjectDescription = styled.p`
  color: #fff;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechnologyTag = styled.span`
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(0, 255, 136, 0.2);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 255, 136, 0.3);

  &.github {
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;

  &:hover {
    background: rgba(0, 255, 136, 0.2);
    border-color: rgba(0, 255, 136, 0.5);
    }
  }

  &.live {
    background: linear-gradient(45deg, #00ff88, #00cc6a);
    color: #000;
    
    &:hover {
    transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
    }
  }
`;

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AchievementItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  &::before {
    content: '▸';
    color: #00ff88;
    font-weight: bold;
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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await contentService.fetchProjectsData();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <ProjectsSection>
        <Container>
          <LoadingContainer>
            <RefreshCw size={40} className="animate-spin" />
          </LoadingContainer>
        </Container>
      </ProjectsSection>
    );
  }

  if (error) {
    return (
      <ProjectsSection>
        <Container>
          <ErrorContainer>
            <h3>Error Loading Projects</h3>
            <p>{error}</p>
          </ErrorContainer>
        </Container>
      </ProjectsSection>
    );
  }

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Projects
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Showcasing my expertise in DevOps, cloud infrastructure, and full-stack development
        </SectionSubtitle>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectHeader>
                <ProjectIcon>
                  <Folder />
                </ProjectIcon>
                <ProjectTitle>{project.title}</ProjectTitle>
              </ProjectHeader>

                <ProjectDescription>{project.description}</ProjectDescription>
                
              <TechnologiesList>
                {project.technologies.map((tech, techIndex) => (
                  <TechnologyTag key={techIndex}>{tech}</TechnologyTag>
                  ))}
              </TechnologiesList>

                <ProjectLinks>
                {project.github && (
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" className="github">
                    <Github size={16} />
                    GitHub
                  </ProjectLink>
                )}
                {project.live && (
                  <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer" className="live">
                    <Globe size={16} />
                    Live Demo
                  </ProjectLink>
                )}
                </ProjectLinks>

              <AchievementsList>
                {project.achievements.map((achievement, achievementIndex) => (
                  <AchievementItem key={achievementIndex}>
                    {achievement}
                  </AchievementItem>
                ))}
              </AchievementsList>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 