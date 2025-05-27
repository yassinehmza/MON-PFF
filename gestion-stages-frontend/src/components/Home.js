import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoOFPPT from '../assets/logo-ofppt.png';

import Footer from './Footer';
import About from './About';
function Home() {
  const loginSectionRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Ferme le menu après la navigation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img 
                  src={logoOFPPT} 
                  alt="OFPPT Logo" 
                  className="h-8 sm:h-12 w-auto cursor-pointer"
                />
              </Link>
              
            </div>
            {/* Menu mobile */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Ouvrir le menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection(homeRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Accueil</button>
              <button onClick={() => scrollToSection(aboutRef)} className="text-gray-600 hover:text-gray-900 transition-colors">À propos</button>

              <button                  
              onClick={() => scrollToSection(loginSectionRef)}                  
              className="px-4 py-2 text-white rounded-lg transition-colors hover:opacity-90"
              style={{backgroundColor: '#06668C'}}               
                >
                {/* Icône de flèche */} 
                Commencer
              </button>
            </div>
            {/* Menu mobile déroulant */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-2">
                <div className="flex flex-col space-y-2 px-4">
                  <button 
                    onClick={() => scrollToSection(homeRef)} 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection(aboutRef)} 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left"
                  >
                    À propos
                  </button>
                  <button 
                    onClick={() => scrollToSection(loginSectionRef)} 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2 text-left font-medium"
                  >
                    Commencer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col min-h-screen pt-16">
        {/* Section de l'image en plein écran */}
        <section id="home" ref={homeRef} className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src={require('../assets/Monimage.png')} 
              alt="Background" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="relative z-10 text-center text-white">
          </div>
        </section>

        {/* Section des interfaces de connexion */}
        <section ref={loginSectionRef} className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Connectez-vous à votre espace</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Espace Formateur */}
              <Link to="/formateur/login" className="transform hover:scale-105 transition-transform">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow h-full">
                  <div className="bg-blue-100 text-blue-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Espace Formateur</h3>
                  <p className="text-gray-600 mb-6">Gérez vos stagiaires et les stages</p>
                  <button className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors">
                    Connectez-vous
                  </button>
                </div>
              </Link>

              {/* Espace Administrateur */}
              <Link to="/administrateur/login" className="transform hover:scale-105 transition-transform">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow h-full">
                  <div className="bg-purple-100 text-purple-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Espace Administrateur</h3>
                  <p className="text-gray-600 mb-6">Gérez l'ensemble de la plateforme</p>
                  <button className="w-full px-6 py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition-colors">
                    Connectez-vous
                  </button>
                </div>
              </Link>

              {/* Espace Étudiant */}
              <Link to="/etudiant/login" className="transform hover:scale-105 transition-transform">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow h-full">
                  <div className="bg-orange-100 text-orange-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Espace Stagiaire</h3>
                  <p className="text-gray-600 mb-6">Consultez vos stages et documents</p>
                  <button className="w-full px-6 py-3 bg-orange-700 text-white rounded-xl hover:bg-orange-800 transition-colors">
                    Connectez-vous
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div id="about" ref={aboutRef}>
        <About />
      </div>

      

      <Footer />
    </div>
  );
}

export default Home;