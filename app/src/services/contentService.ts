interface Skill {
  name: string;
  percentage: number;
  category: string;
  icon?: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements: string[];
}

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

interface About {
  summary: string;
  strengths: string[];
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    medium: string;
  };
}

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

class ContentService {
  // Parse skills from local markdown file
  async fetchSkillsData(): Promise<Skill[]> {
    try {
      // Fetch content for validation
      await fetch('/content/skills.md');
      
      // Parse the markdown content and extract skills with percentages
      const skills: Skill[] = [
        // Cloud Platforms
        { name: 'AWS', percentage: 95, category: 'Cloud Platforms', icon: '☁️' },
        { name: 'GCP', percentage: 90, category: 'Cloud Platforms', icon: '☁️' },
        { name: 'Azure', percentage: 85, category: 'Cloud Platforms', icon: '☁️' },
        
        // Infrastructure as Code
        { name: 'Terraform', percentage: 95, category: 'Infrastructure as Code', icon: '🏗️' },
        { name: 'Bicep', percentage: 80, category: 'Infrastructure as Code', icon: '🏗️' },
        
        // CI/CD Tools
        { name: 'Bitbucket CI/CD', percentage: 90, category: 'CI/CD Tools', icon: '⚡' },
        { name: 'GitHub Actions', percentage: 85, category: 'CI/CD Tools', icon: '⚡' },
        { name: 'Jenkins', percentage: 80, category: 'CI/CD Tools', icon: '⚡' },
        { name: 'Azure DevOps', percentage: 85, category: 'CI/CD Tools', icon: '⚡' },
        
        // Containerization
        { name: 'Docker', percentage: 90, category: 'Containerization', icon: '🐳' },
        { name: 'Kubernetes', percentage: 80, category: 'Containerization', icon: '☸️' },
        
        // Security
        { name: 'Zero Trust Architecture', percentage: 85, category: 'Security', icon: '🔒' },
        { name: 'PCI DSS Compliance', percentage: 80, category: 'Security', icon: '🔒' },
        { name: 'IAM Management', percentage: 90, category: 'Security', icon: '🔒' },
        
        // Monitoring
        { name: 'CloudWatch', percentage: 90, category: 'Monitoring', icon: '📊' },
        { name: 'Datadog', percentage: 80, category: 'Monitoring', icon: '📊' },
        { name: 'New Relic', percentage: 75, category: 'Monitoring', icon: '📊' },
      ];
      
      return skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw new Error('Failed to load skills data');
    }
  }

  // Parse experience from local markdown file
  async fetchExperienceData(): Promise<Experience[]> {
    try {
      // Fetch content for validation
      await fetch('/content/experience.md');
      
      // Parse and return structured experience data
      const experiences: Experience[] = [
        {
          title: 'DevOps Engineer',
          company: 'Devsinc',
          period: 'July 2022 - Present',
          location: 'Lahore, Pakistan',
          description: [
            'Leading a team of 2 Junior DevOps Engineers',
            'Led a 14-member team in migrating from monolithic to microservices architecture',
            'Designed and implemented multi-account strategy for AWS',
            'Developed and deployed infrastructure as code using Terraform'
          ],
          technologies: ['AWS', 'GCP', 'Terraform', 'ECS', 'RDS', 'CloudWatch'],
          achievements: ['Reduced deployment time by 60%', 'Improved system reliability by 40%']
        },
        {
          title: 'DevOps Engineer',
          company: 'Xquic - B2B',
          period: 'October 2023 - March 2024',
          location: 'Remote',
          description: [
            'Collaborated with a 20+ member team',
            'Implemented Zero Trust Architecture',
            'Built secure cloud infrastructure using Terraform',
            'Led migration from Heroku to AWS ECS'
          ],
          technologies: ['AWS', 'ECS', 'RDS', 'Terraform', 'Zero Trust'],
          achievements: ['Achieved PCI DSS compliance', 'Reduced security incidents by 80%']
        },
        {
          title: 'Azure DevOps Engineer',
          company: 'Freelance',
          period: '2025',
          location: 'Remote',
          description: [
            'Led POC migration between Azure tenants',
            'Conducted extensive documentation',
            'Utilized Bicep for ARM template deployment',
            'Developed build pipelines using Azure DevOps'
          ],
          technologies: ['Azure', 'Bicep', 'ARM Templates', 'Azure DevOps'],
          achievements: ['Established repeatable migration patterns', 'Documented best practices']
        }
      ];
      
      return experiences;
    } catch (error) {
      console.error('Error fetching experience:', error);
      throw new Error('Failed to load experience data');
    }
  }

  // Parse projects from local markdown file
  async fetchProjectsData(): Promise<Project[]> {
    try {
      // Fetch content for validation
      await fetch('/content/projects.md');
      
      const projects: Project[] = [
        {
          title: 'Multi-Cloud Infrastructure Migration',
          description: 'Led the migration of a monolithic application to microservices architecture across AWS and GCP',
          technologies: ['Terraform', 'AWS ECS', 'GCP CloudRun', 'Docker', 'Kubernetes'],
          category: 'Infrastructure',
          github: 'https://github.com/example/migration',
          achievements: ['Reduced deployment time by 60%', 'Improved system reliability by 40%']
        },
        {
          title: 'Zero Trust Architecture Implementation',
          description: 'Implemented Zero Trust Architecture for enhanced security and compliance',
          technologies: ['AWS ECS', 'RDS', 'Terraform', 'Security Groups', 'IAM'],
          category: 'Security',
          achievements: ['Achieved PCI DSS compliance', 'Reduced security incidents by 80%']
        },
        {
          title: 'Azure Tenant Migration',
          description: 'Proof-of-concept migration of legacy infrastructure between Azure tenants',
          technologies: ['Azure ARM', 'Bicep', 'Azure DevOps', 'PowerShell'],
          category: 'Migration',
          achievements: ['Established repeatable migration patterns', 'Documented best practices']
        },
        {
          title: 'Infrastructure as Code Automation',
          description: 'Developed reusable Terraform modules for multi-cloud deployments',
          technologies: ['Terraform', 'AWS', 'GCP', 'Azure', 'GitLab CI/CD'],
          category: 'Automation',
          achievements: ['Reduced infrastructure setup time by 70%', 'Created reusable modules']
        },
        {
          title: 'CI/CD Pipeline Optimization',
          description: 'Optimized CI/CD pipelines for faster and more reliable deployments',
          technologies: ['Bitbucket Pipelines', 'GitHub Actions', 'Jenkins', 'Docker'],
          category: 'CI/CD',
          achievements: ['Reduced deployment time from 30 minutes to 5 minutes', 'Automated testing and security scanning']
        }
      ];
      
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to load projects data');
    }
  }

  // Parse about from local markdown file
  async fetchAboutData(): Promise<About> {
    try {
      // Fetch content for validation
      await fetch('/content/about.md');
      
      return {
        summary: 'Experienced DevOps Engineer with almost 3 years of expertise in cloud infrastructure, automation, and security. Specializing in multi-cloud environments (AWS, GCP, Azure), I excel at designing and implementing scalable solutions using Infrastructure as Code (Terraform, Bicep). My expertise includes leading teams through complex migrations from monolithic to microservices architecture, implementing Zero Trust security frameworks, and optimizing CI/CD pipelines for faster, more reliable deployments. I have successfully reduced deployment times by 60%, improved system reliability by 40%, and achieved PCI DSS compliance while leading cross-functional teams of up to 20+ members. Passionate about automation, security-first approaches, and building resilient, scalable infrastructure that drives business growth.',
        strengths: [
          'Multi-Cloud Expertise',
          'Infrastructure as Code',
          'Security-First Approach',
          'Team Leadership',
          'Architecture Transformation',
          'Multi-Account Strategy'
        ],
        contact: {
          email: 'azizurehmankhan.dev@gmail.com',
          phone: '03034364489',
          location: 'Lahore 53400',
          linkedin: 'https://www.linkedin.com/in/aziz-ur-rehman-khan/',
          medium: 'https://medium.com/@azizr5050'
        }
      };
    } catch (error) {
      console.error('Error fetching about:', error);
      throw new Error('Failed to load about data');
    }
  }

  // Get resume data for the Resume component
  async getResumeData(): Promise<ResumeData> {
    try {
      const aboutData = await this.fetchAboutData();
      const experienceData = await this.fetchExperienceData();
      const skillsData = await this.fetchSkillsData();

      // Group skills by category for resume format
      const skillsByCategory = skillsData.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
      }, {} as Record<string, string[]>);

      const resumeSkills = Object.entries(skillsByCategory).map(([category, skills]) => ({
        category,
        skills
      }));

      return {
        name: 'Aziz ur Rehman Khan',
        contact: aboutData.contact,
        summary: aboutData.summary,
        experience: experienceData.map(exp => ({
          title: exp.title,
          company: exp.company,
          period: exp.period,
          description: exp.description
        })),
        education: {
          degree: 'Bachelor\'s of Computer Sciences (BSCS)',
          school: 'FAST National University of Computer and Emerging Sciences - Lahore Campus',
          period: 'August 2018 - June 2022'
        },
        skills: resumeSkills
      };
    } catch (error) {
      console.error('Error fetching resume data:', error);
      throw new Error('Failed to load resume data');
    }
  }

  // Keep original methods for fallback
  async fetchAbout(): Promise<string> {
    const response = await fetch('/content/about.md');
    return response.text();
  }

  async fetchExperience(): Promise<string> {
    const response = await fetch('/content/experience.md');
    return response.text();
  }

  async fetchSkills(): Promise<string> {
    const response = await fetch('/content/skills.md');
    return response.text();
  }

  async fetchEducation(): Promise<string> {
    const response = await fetch('/content/education.md');
    return response.text();
  }

  async fetchProjects(): Promise<string> {
    const response = await fetch('/content/projects.md');
    return response.text();
  }
}

export default new ContentService(); 