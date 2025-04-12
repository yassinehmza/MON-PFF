import React from 'react';
import { Link } from 'react-router-dom';
import logoOFPPT from '../assets/logo-ofppt.png';
import illustration from '../assets/illustration.svg';
import Footer from './Footer';
import About from './About';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src={logoOFPPT} 
                alt="OFPPT Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">OFPPT</h1>
                <p className="text-sm text-gray-600">Formation Professionnelle</p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/apropos" className="text-gray-600 hover:text-gray-900 transition-colors">À propos</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Commencer
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 flex flex-col items-center justify-center p-6 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-16 px-4">
          <div className="w-full md:w-1/2 text-left md:pr-12 mb-8 md:mb-0">
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent mb-8 leading-tight animate-fade-in tracking-tight">
              Bienvenue sur <p className="inline-block font-black text-7xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-pulse">E-stage</p>
            </h1>
            
            {/* Suppression des boutons */}
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full max-w-lg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: "#4F46E5", stopOpacity: 1}} />
                  <stop offset="60%" style={{stopColor: "#818CF8", stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: "#60A5FA", stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: "#4F46E5", stopOpacity: 0.8}} />
                  <stop offset="50%" style={{stopColor: "#818CF8", stopOpacity: 0.5}} />
                  <stop offset="100%" style={{stopColor: "#60A5FA", stopOpacity: 0.2}} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4F46E5" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              
              {/* Fond avec motif géométrique */}
              <rect width="800" height="600" fill="url(#grid)" opacity="0.3" />
              <path d="M0,300 C150,200 250,400 400,300 S650,200 800,300" stroke="url(#grad1)" strokeWidth="3" fill="none" opacity="0.2" className="animate-float" />
              <path d="M0,350 C150,250 250,450 400,350 S650,250 800,350" stroke="url(#grad1)" strokeWidth="3" fill="none" opacity="0.2" className="animate-float" />
              
              {/* Cercle principal avec effet de lueur */}
              <circle cx="400" cy="300" r="180" fill="url(#grad2)" opacity="0.15" filter="url(#glow)" className="animate-pulse" />
              <circle cx="400" cy="300" r="160" stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.3" className="animate-spin-slow" />
              
              {/* Éléments décoratifs animés */}
              <g className="animate-pulse">
                <circle cx="300" cy="250" r="40" fill="#4F46E5" opacity="0.2" />
                <circle cx="300" cy="250" r="35" stroke="#818CF8" strokeWidth="2" fill="none" opacity="0.3" />
                <circle cx="500" cy="350" r="25" fill="#60A5FA" opacity="0.15" />
                <circle cx="500" cy="350" r="20" stroke="#818CF8" strokeWidth="2" fill="none" opacity="0.3" />
                <circle cx="400" cy="200" r="15" fill="#4F46E5" opacity="0.1" />
              </g>
              
              {/* Icônes représentant la gestion des stages */}
              <g transform="translate(350,270)" className="animate-float">
                {/* Ordinateur portable */}
                <rect x="-20" y="-20" width="140" height="100" rx="10" fill="#4F46E5" opacity="0.2" />
                <rect x="-15" y="-15" width="130" height="90" rx="8" fill="#FFFFFF" opacity="0.9" />
                {/* Écran avec code animé */}
                <g className="animate-pulse">
                  <rect x="-10" y="-10" width="120" height="70" rx="4" fill="#1E1E1E" />
                  <path d="M-5,0 h40 M-5,10 h30 M-5,20 h35" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <path d="M40,0 h30 M40,10 h40 M40,20 h25" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <path d="M-5,35 h60 M-5,45 h45" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </g>
                {/* Base de l'ordinateur */}
                <path d="M-20,80 L100,80 L90,90 L-10,90 Z" fill="#4F46E5" opacity="0.3" />

                {/* Diplôme animé */}
                <g transform="translate(80,-40)" className="animate-float">
                  <path d="M0,0 h60 l10,10 v80 l-10,10 h-60 l-10,-10 v-80 l10,-10 z" fill="#F59E0B" opacity="0.2" />
                  <path d="M10,30 h40 M10,45 h30 M10,60 h35" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
                  </path>
                  <circle cx="30" cy="85" r="15" fill="#F59E0B" opacity="0.3" />
                  <path d="M20,85 h20 M30,75 v20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </g>

                {/* Documents de stage avec validation */}
                <g transform="translate(-60,-20)" className="animate-float">
                  <rect x="0" y="0" width="70" height="90" rx="8" fill="#818CF8" opacity="0.2" />
                  <path d="M10,20 h40 M10,35 h30 M10,50 h35" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" opacity="0.4">
                    <animate attributeName="strokeWidth" values="3;4;3" dur="2s" repeatCount="indefinite" />
                  </path>
                  <circle cx="50" cy="70" r="12" fill="#22C55E" opacity="0.3">
                    <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <path d="M43,70 L48,75 L57,65" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <animate attributeName="strokeWidth" values="2.5;3;2.5" dur="2s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Icônes de processus de stage */}
                <g transform="translate(20,60)">
                  <circle cx="0" cy="0" r="20" fill="#60A5FA" opacity="0.2">
                    <animate attributeName="r" values="20;22;20" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round">
                    <animate attributeName="strokeWidth" values="2;3;2" dur="2s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Validation et signature */}
                <g transform="translate(100,40)">
                  <circle cx="0" cy="0" r="18" fill="#22C55E" opacity="0.2">
                    <animate attributeName="r" values="18;20;18" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <path d="M-8,0 L-2,6 L8,-4" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <animate attributeName="strokeWidth" values="3;4;3" dur="2s" repeatCount="indefinite" />
                  </path>
                </g>
              </g>
              
              {/* Éléments supplémentaires de gestion */}
              <g transform="translate(250,200)" className="animate-float">
                <circle cx="0" cy="0" r="25" fill="#4F46E5" opacity="0.15" />
                <path d="M-12,-12 L12,12 M-12,12 L12,-12" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </g>
              
              <g transform="translate(550,200)" className="animate-float">
                <circle cx="0" cy="0" r="25" fill="#60A5FA" opacity="0.15" />
                <path d="M-8,0 L8,0 M0,-8 L0,8" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </g>
              
              {/* Éléments de connexion */}
              <g stroke="url(#grad1)" strokeWidth="3" opacity="0.4" className="animate-pulse">
                <path d="M250,300 Q325,250 400,300" fill="none" className="animate-dash" />
                <path d="M400,300 Q475,350 550,300" fill="none" className="animate-dash" />
                <circle cx="250" cy="300" r="8" fill="#4F46E5">
                  <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="300" r="8" fill="#818CF8">
                  <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="550" cy="300" r="8" fill="#60A5FA">
                  <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
              
              {/* Particules flottantes avec animations */}
              <g>
                <circle cx="200" cy="200" r="3" fill="#4F46E5" opacity="0.6">
                  <animate attributeName="cy" values="200;190;200" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="600" cy="400" r="3" fill="#60A5FA" opacity="0.6">
                  <animate attributeName="cy" values="400;410;400" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="450" r="3" fill="#818CF8" opacity="0.6">
                  <animate attributeName="cy" values="450;440;450" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="500" cy="150" r="3" fill="#4F46E5" opacity="0.6">
                  <animate attributeName="cy" values="150;160;150" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="700" cy="300" r="3" fill="#60A5FA" opacity="0.6">
                  <animate attributeName="cy" values="300;290;300" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="350" r="3" fill="#818CF8" opacity="0.6">
                  <animate attributeName="cy" values="350;360;350" dur="3.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3.2s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </div>
        </div>

        <div className="text-center mb-12">
          
          <p className="text-xl text-gray-600 mt-4">Connectez-vous à votre espace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          {/* Espace Formateur */}
          <Link to="/formateur/login" className="transform hover:scale-105 transition-transform">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="bg-blue-100 text-blue-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Espace Formateur</h3>
              <p className="text-gray-600 mt-2">Gérez vos stagiaires et les stages</p>
              <button className="mt-6 px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors">
                Connectez-vous
              </button>
            </div>
          </Link>

          {/* Espace Administrateur */}
          <Link to="/administrateur/login" className="transform hover:scale-105 transition-transform">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="bg-purple-100 text-purple-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Espace Administrateur</h3>
              <p className="text-gray-600 mt-2">Gérez l'ensemble de la plateforme</p>
              <button className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition-colors">
                Connectez-vous
              </button>
            </div>
          </Link>

          {/* Espace Étudiant */}
          <Link to="/etudiant/login" className="transform hover:scale-105 transition-transform">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="bg-orange-100 text-orange-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Espace Stagiaire</h3>
              <p className="text-gray-600 mt-2">Consultez vos stages et documents</p>
              <button className="mt-6 px-6 py-3 bg-orange-700 text-white rounded-xl hover:bg-orange-800 transition-colors">
                Connectez-vous
              </button>
            </div>
          </Link>
        </div>
      </main>

      <About />
      <Footer />
    </div>
  );
}

export default Home;