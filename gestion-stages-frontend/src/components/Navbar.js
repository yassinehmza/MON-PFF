import React from 'react';
import { ArrowRight } from 'lucide-react';

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  backgroundColor: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const logoStyle = {
  color: '#3b82f6',
  fontWeight: 'bold',
  fontSize: '24px'
};

const linksContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px'
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#4b5563',
  textDecoration: 'none'
};

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '6px',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
};

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        E-stage
      </div>
      
      {/* Navigation Links */}
      <div style={linksContainerStyle}>
        <a href="/" style={linkStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Accueil</span>
        </a>
        
        <a href="/a-propos" style={linkStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>À propos</span>
        </a>
        
        <a href="/contact" style={linkStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Contact</span>
        </a>
      </div>
      
      {/* Call to Action Button */}
      <button style={buttonStyle}>
        Commencer
        <ArrowRight style={{ marginLeft: '8px', width: '16px', height: '16px' }} />
      </button>
    </nav>
  );
};

export default Navbar;