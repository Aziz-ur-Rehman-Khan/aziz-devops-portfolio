import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, FileCode, FileType, ExternalLink, RefreshCw } from 'lucide-react';

const ResumeSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 255, 136, 0.05));
  position: relative;
`;

const Container = styled.div`
  max-width: 1000px;
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

  @media (max-width: 768px) {
    padding: 2rem 1rem;
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
  gap: 1rem;
`;

const SkillCategory = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  padding: 1rem;
`;

const SkillCategoryTitle = styled.h4`
  font-family: 'Orbitron', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

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

const GitHubResume: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GitHub raw content URL - replace with your actual GitHub repo URL
  const RESUME_URL = 'https://raw.githubusercontent.com/azizr5050/resume/main/Resume.md';

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(RESUME_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      
      const markdownContent = await response.text();
      const parsedData = parseMarkdownResume(markdownContent);
      setResumeData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resume');
      console.error('Error fetching resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const parseMarkdownResume = (markdown: string): ResumeData => {
    const lines = markdown.split('\n');
    let currentSection = '';
    let currentJob: any = null;
    
    const data: ResumeData = {
      name: '',
      contact: {
        location: '',
        email: '',
        phone: '',
        linkedin: '',
        medium: ''
      },
      summary: '',
      experience: [],
      education: {
        degree: '',
        school: '',
        period: ''
      },
      skills: []
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ')) {
        data.name = line.substring(2);
      } else if (line.includes('**') && line.includes('|')) {
        // Parse contact info
        const contactMatch = line.match(/\*\*(.*?)\*\*/g);
        if (contactMatch) {
          const contacts = contactMatch.map(c => c.replace(/\*\*/g, ''));
          if (contacts.length >= 3) {
            data.contact.location = contacts[0];
            data.contact.email = contacts[1];
            data.contact.phone = contacts[2];
          }
        }
        
        // Parse LinkedIn and Medium links
        const linkedinMatch = line.match(/\[LinkedIn\]\((.*?)\)/);
        const mediumMatch = line.match(/\[Medium\]\((.*?)\)/);
        if (linkedinMatch) data.contact.linkedin = linkedinMatch[1];
        if (mediumMatch) data.contact.medium = mediumMatch[1];
      } else if (line.startsWith('## ')) {
        currentSection = line.substring(3);
      } else if (line.startsWith('### ')) {
        if (currentSection === 'Work Experience') {
          if (currentJob) {
            data.experience.push(currentJob);
          }
          currentJob = {
            title: line.substring(4),
            company: '',
            period: '',
            description: []
          };
        } else if (currentSection === 'Education') {
          data.education.degree = line.substring(4);
        }
      } else if (line.startsWith('**') && line.includes('|') && currentJob) {
        const parts = line.split('|');
        if (parts.length >= 2) {
          currentJob.company = parts[0].replace(/\*\*/g, '').trim();
          currentJob.period = parts[1].replace(/\*/g, '').trim();
        }
      } else if (line.startsWith('- ') && currentJob) {
        currentJob.description.push(line.substring(2));
      } else if (line.startsWith('**') && currentSection === 'Education') {
        const schoolMatch = line.match(/\*\*(.*?)\*\*/);
        if (schoolMatch) {
          data.education.school = schoolMatch[1];
        }
      } else if (line.startsWith('- **') && currentSection === 'Skills') {
        const categoryMatch = line.match(/- \*\*(.*?)\*\*:/);
        if (categoryMatch) {
          const category = categoryMatch[1];
          const skillsText = line.split(':')[1]?.trim() || '';
          const skills = skillsText.split(',').map(s => s.trim());
          data.skills.push({ category, skills });
        }
      } else if (line && currentSection === 'Professional Summary' && !data.summary) {
        data.summary = line;
      }
    }
    
    // Add the last job
    if (currentJob) {
      data.experience.push(currentJob);
    }

    return data;
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const downloadResume = (format: string) => {
    if (!resumeData) return;

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'markdown':
        content = `# ${resumeData.name}

**${resumeData.contact.location}** | **${resumeData.contact.email}** | **${resumeData.contact.phone}** | **[LinkedIn](${resumeData.contact.linkedin})** | **[Medium](${resumeData.contact.medium})**

## Professional Summary

${resumeData.summary}

## Work Experience

${resumeData.experience.map(job => `### ${job.title}
**${job.company}** | *${job.period}*

${job.description.map(item => `- ${item}`).join('\n')}`).join('\n\n')}

## Education

### ${resumeData.education.degree}
**${resumeData.education.school}** | *${resumeData.education.period}*

## Skills

${resumeData.skills.map(category => `- **${category.category}:** ${category.skills.join(', ')}`).join('\n')}`;
        filename = 'Aziz_ur_Rehman_Khan_Resume.md';
        mimeType = 'text/markdown';
        break;

      case 'txt':
        content = `${resumeData.name}
${resumeData.contact.location} | ${resumeData.contact.email} | ${resumeData.contact.phone}
LinkedIn: ${resumeData.contact.linkedin}
Medium: ${resumeData.contact.medium}

PROFESSIONAL SUMMARY
${resumeData.summary}

WORK EXPERIENCE

${resumeData.experience.map(job => `${job.title}
${job.company} | ${job.period}

${job.description.map(item => `• ${item}`).join('\n')}`).join('\n\n')}

EDUCATION

${resumeData.education.degree}
${resumeData.education.school} | ${resumeData.education.period}

SKILLS

${resumeData.skills.map(category => `${category.category}: ${category.skills.join(', ')}`).join('\n')}`;
        filename = 'Aziz_ur_Rehman_Khan_Resume.txt';
        mimeType = 'text/plain';
        break;

      case 'json':
        content = JSON.stringify(resumeData, null, 2);
        filename = 'Aziz_ur_Rehman_Khan_Resume.json';
        mimeType = 'application/json';
        break;

      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <ResumeSection id="resume" ref={ref}>
        <Container>
          <SectionTitle>Resume</SectionTitle>
          <LoadingState>
            <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite' }} />
            <p>Loading resume from GitHub...</p>
          </LoadingState>
        </Container>
      </ResumeSection>
    );
  }

  if (error || !resumeData) {
    return (
      <ResumeSection id="resume" ref={ref}>
        <Container>
          <SectionTitle>Resume</SectionTitle>
          <ErrorState>
            <p>Failed to load resume: {error}</p>
            <RefreshButton onClick={fetchResume} whileHover={{ scale: 1.05 }}>
              <RefreshCw size={16} />
              Try Again
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
          Resume
        </SectionTitle>

        <DownloadButtons
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DownloadButton
            onClick={() => downloadResume('markdown')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileCode size={18} />
            Download Markdown
          </DownloadButton>
          <DownloadButton
            onClick={() => downloadResume('txt')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={18} />
            Download Text
          </DownloadButton>
          <DownloadButton
            onClick={() => downloadResume('json')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileType size={18} />
            Download JSON
          </DownloadButton>
        </DownloadButtons>

        <ResumeContent
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ResumeHeader>
            <Name>{resumeData.name}</Name>
            <ContactInfo>
              {resumeData.contact.location} |{' '}
              <ContactLink href={`mailto:${resumeData.contact.email}`}>
                {resumeData.contact.email}
              </ContactLink>{' '}
              | {resumeData.contact.phone}
            </ContactInfo>
            <ContactInfo>
              <ContactLink href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ExternalLink size={12} />
              </ContactLink>{' '}
              |{' '}
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
                  {job.description.map((item, itemIndex) => (
                    <JobDescriptionItem key={itemIndex}>{item}</JobDescriptionItem>
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
              {resumeData.skills.map((category, index) => (
                <SkillCategory key={index}>
                  <SkillCategoryTitle>{category.category}</SkillCategoryTitle>
                  <SkillList>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillItem key={skillIndex}>{skill}</SkillItem>
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

export default GitHubResume; 