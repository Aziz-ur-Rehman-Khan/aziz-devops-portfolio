import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
}

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.3);
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff88;
  text-shadow: 0 0 10px #00ff88;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${props => props.$active ? '#00ff88' : '#fff'};
  text-decoration: none;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 6px;

  &:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #00ff88;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  ${props => props.$active && `
    &::after {
      width: 100%;
    }
  `}
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #00ff88;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const MobileNavLink = styled(motion.button)<{ active: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#00ff88' : '#fff'};
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
  }
`;

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'resume', label: 'RESUME' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.9)',
        borderBottomColor: isScrolled ? 'rgba(0, 255, 136, 0.5)' : 'rgba(0, 255, 136, 0.3)'
      }}
    >
      <Nav>
        <Logo>AZIZ.DEV</Logo>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink 
              key={item.id}
              href={`#${item.id}`}
              $active={currentSection === item.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.id === 'resume' ? (
                <>
                  <FileText size={16} />
                  {item.label}
                </>
              ) : (
                item.label
              )}
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </Nav>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.id}
                active={currentSection === item.id}
                onClick={() => scrollToSection(item.id)}
              >
                {item.id === 'resume' ? (
                  <>
                    <FileText size={16} />
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header; 