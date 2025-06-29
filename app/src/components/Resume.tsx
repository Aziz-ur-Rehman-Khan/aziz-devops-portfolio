import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, ExternalLink, RefreshCw } from 'lucide-react';
import contentService from '../services/contentService';

interface ResumeData {
  name: string;
  contact: {
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    medium: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: {
    degree: string;
    school: string;
    period: string;
  };
  skills: Array<{
    category: string;
    skills: string[];
  }>;
}

const ResumeSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 255, 136, 0.05));
  position: relative;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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

const DownloadButtons = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DownloadButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(0, 255, 136, 0.1);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  color: #00ff88;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.2);
    border-color: rgba(0, 255, 136, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResumeContent = styled(motion.div)`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #fff;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff88, transparent);
    animation: scan 3s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const scan = `
  @keyframes scan {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #00ff88;
  font-family: 'Orbitron', monospace;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #ff6b6b;
  font-family: 'Inter', sans-serif;
`;

const RefreshButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 6px;
  color: #ff6b6b;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 1rem auto;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: rgba(255, 107, 107, 0.5);
  }
`;

const ResumeHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 255, 136, 0.3);
`;

const Name = styled.h1`
  font-family: 'Orbitron', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #00ff88;
`;

const ContactInfo = styled.div`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  color: #00ff88;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #00cc6a;
    text-decoration: underline;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitleResume = styled.h2`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ff88;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 255, 136, 0.3);
  padding-bottom: 0.5rem;
`;

const JobTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 600;
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 1rem;
  font-style: italic;
`;

const JobDescription = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const JobDescriptionItem = styled.li`
  color: #ccc;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #00ff88;
    font-weight: bold;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SkillCategory = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
`;

const SkillCategoryTitle = styled.h4`
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const SkillItem = styled.li`
  color: #ccc;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #00ff88;
  }
`;

const Resume: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const data = await contentService.getResumeData();
        setResumeData(data);
      } catch (err) {
        setError('Failed to load resume data');
        console.error('Error fetching resume data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const downloadResume = (format: string) => {
    if (!resumeData) return;

    let content = '';
    let filename = '';

    if (format === 'txt') {
      content = generateTextResume(resumeData);
      filename = 'Aziz_ur_Rehman_Khan_Resume.txt';
    } else if (format === 'md') {
      content = generateMarkdownResume(resumeData);
      filename = 'Aziz_ur_Rehman_Khan_Resume.md';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTextResume = (data: ResumeData): string => {
    return `
${data.name}
${data.contact.location} | ${data.contact.email} | ${data.contact.phone}
LinkedIn: ${data.contact.linkedin} | Medium: ${data.contact.medium}

PROFESSIONAL SUMMARY
${data.summary}

WORK EXPERIENCE

${data.experience.map(exp => `
${exp.title}
${exp.company} | ${exp.period}
${exp.description.map(desc => `• ${desc}`).join('\n')}
`).join('\n')}

EDUCATION

${data.education.degree}
${data.education.school} | ${data.education.period}

SKILLS

${data.skills.map(skill => `
${skill.category}:
${skill.skills.join(', ')}
`).join('\n')}
    `.trim();
  };

  const generateMarkdownResume = (data: ResumeData): string => {
    return `# ${data.name}

**${data.contact.location}** | **${data.contact.email}** | **${data.contact.phone}** | **[LinkedIn](${data.contact.linkedin})** | **[Medium](${data.contact.medium})**

## Professional Summary

${data.summary}

## Work Experience

${data.experience.map(exp => `
### ${exp.title}
**${exp.company}** | *${exp.period}*

${exp.description.map(desc => `- ${desc}`).join('\n')}
`).join('\n')}

## Education

### ${data.education.degree}
**${data.education.school}** | *${data.education.period}*

## Skills

${data.skills.map(skill => `
### ${skill.category}
- ${skill.skills.join('\n- ')}
`).join('\n')}
    `.trim();
  };

  if (loading) {
    return (
      <ResumeSection>
        <Container>
          <LoadingState>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: '2rem', marginBottom: '1rem' }}
            >
              ⚡
            </motion.div>
            LOADING RESUME MODULE...
          </LoadingState>
        </Container>
      </ResumeSection>
    );
  }

  if (error || !resumeData) {
    return (
      <ResumeSection>
        <Container>
          <ErrorState>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <h3>ERROR: {error}</h3>
            <RefreshButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={16} />
              RETRY CONNECTION
            </RefreshButton>
          </ErrorState>
        </Container>
      </ResumeSection>
    );
  }

  return (
    <ResumeSection id="resume" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            RESUME.DOC
          </motion.span>
        </SectionTitle>

        <DownloadButtons
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <DownloadButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => downloadResume('txt')}
          >
            <FileText size={20} />
            Download TXT
          </DownloadButton>
          <DownloadButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => downloadResume('md')}
          >
            <FileText size={20} />
            Download MD
          </DownloadButton>
          <DownloadButton
            as="a"
            href="https://github.com/Aziz-ur-Rehman-Khan/aziz-devops-portfolio/blob/main/Resume.md"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={20} />
            View on GitHub
          </DownloadButton>
        </DownloadButtons>

        <ResumeContent
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <style>{scan}</style>
          
          <ResumeHeader>
            <Name>{resumeData.name}</Name>
            <ContactInfo>
              {resumeData.contact.location} | {resumeData.contact.email} | {resumeData.contact.phone}
              <br />
              <ContactLink href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ExternalLink size={12} />
              </ContactLink> | {' '}
              <ContactLink href={resumeData.contact.medium} target="_blank" rel="noopener noreferrer">
                Medium <ExternalLink size={12} />
              </ContactLink>
            </ContactInfo>
          </ResumeHeader>

          <Section>
            <SectionTitleResume>Professional Summary</SectionTitleResume>
            <p>{resumeData.summary}</p>
          </Section>

          <Section>
            <SectionTitleResume>Work Experience</SectionTitleResume>
            {resumeData.experience.map((job, index) => (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <JobTitle>{job.title}</JobTitle>
                <CompanyInfo>{job.company} | {job.period}</CompanyInfo>
                <JobDescription>
                  {job.description.map((desc, i) => (
                    <JobDescriptionItem key={i}>{desc}</JobDescriptionItem>
                  ))}
                </JobDescription>
              </div>
            ))}
          </Section>

          <Section>
            <SectionTitleResume>Education</SectionTitleResume>
            <JobTitle>{resumeData.education.degree}</JobTitle>
            <CompanyInfo>{resumeData.education.school} | {resumeData.education.period}</CompanyInfo>
          </Section>

          <Section>
            <SectionTitleResume>Skills</SectionTitleResume>
            <SkillsGrid>
              {resumeData.skills.map((skill, index) => (
                <SkillCategory key={index}>
                  <SkillCategoryTitle>{skill.category}</SkillCategoryTitle>
                  <SkillList>
                    {skill.skills.map((skillItem, i) => (
                      <SkillItem key={i}>{skillItem}</SkillItem>
                    ))}
                  </SkillList>
                </SkillCategory>
              ))}
            </SkillsGrid>
          </Section>
        </ResumeContent>
      </Container>
    </ResumeSection>
  );
};

export default Resume; 