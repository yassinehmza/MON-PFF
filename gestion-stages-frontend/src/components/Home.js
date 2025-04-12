import React from 'react';
import { Link } from 'react-router-dom';
import logoOFPPT from '../assets/logo-ofppt.png';

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

      <main className="pt-24 flex flex-col items-center justify-center p-4 min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-16 px-4">
          <div className="w-full md:w-1/2 text-left md:pr-12 mb-8 md:mb-0">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in">
              Bienvenue sur la plateforme OFPPT
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed animate-slide-up">
              Notre plateforme facilite la gestion et le suivi des stages pour les formateurs, les administrateurs et les étudiants.
              <span className="block mt-4 font-medium text-indigo-600">
                Découvrez une expérience simplifiée pour tous vos besoins en matière de stages professionnels.
              </span>
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full max-w-lg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#60A5FA', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#818CF8', stopOpacity: 0.2}} />
                  <stop offset="100%" style={{stopColor: '#C7D2FE', stopOpacity: 0.1}} />
                </linearGradient>
              </defs>
              
              {/* Fond et éléments décoratifs avec motifs améliorés */}
              <rect x="50" y="50" width="700" height="500" rx="30" fill="url(#grad2)">
                <animate attributeName="opacity" values="0.8;0.9;0.8" dur="4s" repeatCount="indefinite" />
              </rect>
              
              {/* Lignes ondulées animées */}
              <path d="M100 150 Q400 50 700 150" stroke="url(#grad1)" strokeWidth="3" fill="none" opacity="0.4">
                <animate attributeName="d" dur="10s" repeatCount="indefinite"
                  values="M100 150 Q400 50 700 150;M100 170 Q400 70 700 170;M100 150 Q400 50 700 150" />
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M100 450 Q400 550 700 450" stroke="url(#grad1)" strokeWidth="3" fill="none" opacity="0.4">
                <animate attributeName="d" dur="8s" repeatCount="indefinite"
                  values="M100 450 Q400 550 700 450;M100 430 Q400 530 700 430;M100 450 Q400 550 700 450" />
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="6s" repeatCount="indefinite" />
              </path>
              
              {/* Motifs géométriques supplémentaires */}
              <path d="M50 100 L100 100" stroke="url(#grad1)" strokeWidth="2" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M700 500 L650 500" stroke="url(#grad1)" strokeWidth="2" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
              </path>
              
              {/* Motifs de fond améliorés avec animations */}
              <circle cx="200" cy="100" r="15" fill="#818CF8" opacity="0.2" className="animate-pulse-slow">
                <animate attributeName="r" values="15;17;15" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.3;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="500" r="20" fill="#60A5FA" opacity="0.2" className="animate-pulse-slow">
                <animate attributeName="r" values="20;22;20" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.3;0.2" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="700" cy="200" r="10" fill="#4F46E5" opacity="0.2" className="animate-pulse-slow">
                <animate attributeName="r" values="10;12;10" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.3;0.2" dur="3.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Éléments décoratifs supplémentaires */}
              <path d="M150 120 Q200 80 250 120" stroke="#818CF8" strokeWidth="2" fill="none" opacity="0.2">
                <animate attributeName="d" values="M150 120 Q200 80 250 120;M150 125 Q200 85 250 125;M150 120 Q200 80 250 120" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M550 480 Q600 440 650 480" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.2">
                <animate attributeName="d" values="M550 480 Q600 440 650 480;M550 485 Q600 445 650 485;M550 480 Q600 440 650 480" dur="6s" repeatCount="indefinite" />
              </path>
              
              {/* Bureau de travail avec ombres et détails */}
              <rect x="150" y="250" width="500" height="200" rx="20" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2">
                <animate attributeName="opacity" values="0.95;1;0.95" dur="3s" repeatCount="indefinite" />
              </rect>
              
              {/* Détails du bureau */}
              <rect x="170" y="270" width="460" height="160" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              <circle cx="400" cy="350" r="40" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
              
              {/* Éléments décoratifs du bureau */}
              <rect x="200" y="290" width="80" height="5" rx="2" fill="#CBD5E1" />
              <rect x="200" y="305" width="60" height="5" rx="2" fill="#CBD5E1" />
              <rect x="520" y="290" width="80" height="5" rx="2" fill="#CBD5E1" />
              <rect x="520" y="305" width="60" height="5" rx="2" fill="#CBD5E1" />
              
              {/* Étudiants avec plus de détails */}
              {/* Premier étudiant avec animations et détails */}
              <g className="animate-bounce-slow">
                {/* Corps avec ombre */}
                <circle cx="300" cy="200" r="42" fill="#93C5FD" opacity="0.3" />
                <circle cx="300" cy="200" r="40" fill="#60A5FA">
                  <animate attributeName="r" values="40;41;40" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* Visage plus expressif */}
                <path d="M280 180 Q300 165 320 180" stroke="#FFFFFF" strokeWidth="2.5" fill="none">
                  <animate attributeName="d" values="M280 180 Q300 165 320 180;M280 182 Q300 172 320 182;M280 180 Q300 165 320 180" dur="3s" repeatCount="indefinite" />
                </path>
                <circle cx="290" cy="190" r="3.5" fill="#FFFFFF">
                  <animate attributeName="cy" values="190;189;190" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="310" cy="190" r="3.5" fill="#FFFFFF">
                  <animate attributeName="cy" values="190;189;190" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* Cheveux stylisés */}
                <path d="M270 170 Q300 145 330 170" stroke="#2563EB" strokeWidth="8" fill="none">
                  <animate attributeName="d" values="M270 170 Q300 145 330 170;M270 171 Q300 146 330 171;M270 170 Q300 145 330 170" dur="2s" repeatCount="indefinite" />
                </path>
                
                {/* Corps animé */}
                <path d="M300 240 L300 300" stroke="#60A5FA" strokeWidth="15" fill="none">
                  <animate attributeName="d" values="M300 240 L300 300;M300 238 L300 298;M300 240 L300 300" dur="2s" repeatCount="indefinite" />
                </path>
                
                {/* Bras animés */}
                <path d="M300 260 L280 290" stroke="#60A5FA" strokeWidth="10" fill="none">
                  <animate attributeName="d" values="M300 260 L280 290;M300 258 L280 288;M300 260 L280 290" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M300 260 L320 290" stroke="#60A5FA" strokeWidth="10" fill="none">
                  <animate attributeName="d" values="M300 260 L320 290;M300 258 L320 288;M300 260 L320 290" dur="2s" repeatCount="indefinite" />
                </path>
              </g>
              
              {/* Deuxième étudiant avec animations et détails */}
              <g className="animate-bounce-slow">
                {/* Corps avec ombre */}
                <circle cx="500" cy="200" r="42" fill="#A5B4FC" opacity="0.3" />
                <circle cx="500" cy="200" r="40" fill="#818CF8">
                  <animate attributeName="r" values="40;41;40" dur="2.5s" repeatCount="indefinite" />
                </circle>
                
                {/* Visage plus expressif */}
                <path d="M480 180 Q500 165 520 180" stroke="#FFFFFF" strokeWidth="2.5" fill="none">
                  <animate attributeName="d" values="M480 180 Q500 165 520 180;M480 182 Q500 172 520 182;M480 180 Q500 165 520 180" dur="3.5s" repeatCount="indefinite" />
                </path>
                <circle cx="490" cy="190" r="3.5" fill="#FFFFFF">
                  <animate attributeName="cy" values="190;189;190" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="510" cy="190" r="3.5" fill="#FFFFFF">
                  <animate attributeName="cy" values="190;189;190" dur="2.5s" repeatCount="indefinite" />
                </circle>
                
                {/* Cheveux stylisés */}
                <path d="M470 170 Q500 140 530 170" stroke="#4F46E5" strokeWidth="8" fill="none">
                  <animate attributeName="d" values="M470 170 Q500 140 530 170;M470 171 Q500 141 530 171;M470 170 Q500 140 530 170" dur="2.5s" repeatCount="indefinite" />
                </path>
                
                {/* Corps animé */}
                <path d="M500 240 L500 300" stroke="#818CF8" strokeWidth="15" fill="none">
                  <animate attributeName="d" values="M500 240 L500 300;M500 238 L500 298;M500 240 L500 300" dur="2.5s" repeatCount="indefinite" />
                </path>
                
                {/* Bras animés */}
                <path d="M500 260 L480 290" stroke="#818CF8" strokeWidth="10" fill="none">
                  <animate attributeName="d" values="M500 260 L480 290;M500 258 L480 288;M500 260 L480 290" dur="2.5s" repeatCount="indefinite" />
                </path>
                <path d="M500 260 L520 290" stroke="#818CF8" strokeWidth="10" fill="none">
                  <animate attributeName="d" values="M500 260 L520 290;M500 258 L520 288;M500 260 L520 290" dur="2.5s" repeatCount="indefinite" />
                </path>
              </g>
              
              {/* Environnement de travail amélioré avec plus de détails */}
              {/* Bureau avec ombre, reflets et accessoires */}
              <rect x="200" y="320" width="400" height="20" rx="5" fill="#E5E7EB">
                <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x="220" y="340" width="360" height="10" rx="2" fill="#9CA3AF" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.4;0.3" dur="2s" repeatCount="indefinite" />
              </rect>

              {/* Accessoires de bureau animés */}
              <g className="animate-float-slow">
                {/* Tasse de café */}
                <path d="M180 310 Q180 290 200 290 L220 290 Q240 290 240 310" fill="#4F46E5" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.9;0.8" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M185 310 Q185 295 200 295 L220 295 Q235 295 235 310" fill="#818CF8" />
                {/* Vapeur du café */}
                <path d="M200 285 Q210 275 220 285" stroke="#E5E7EB" strokeWidth="2" fill="none" opacity="0.5">
                  <animate attributeName="d" values="M200 285 Q210 275 220 285;M200 280 Q210 270 220 280;M200 285 Q210 275 220 285" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Bloc-notes */}
                <rect x="550" y="280" width="60" height="80" rx="5" fill="#F3F4F6" />
                <path d="M560 290 L600 290 M560 300 L590 300 M560 310 L595 310" stroke="#D1D5DB" strokeWidth="2" opacity="0.6" />

                {/* Stylo */}
                <rect x="620" y="290" width="40" height="4" rx="2" fill="#3B82F6" transform="rotate(-45 640 292)">
                  <animate attributeName="transform" values="rotate(-45 640 292);rotate(-42 640 292);rotate(-45 640 292)" dur="4s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Éléments technologiques */}
              <g className="animate-pulse-slow">
                {/* Écran d'ordinateur */}
                <rect x="350" y="260" width="100" height="70" rx="5" fill="#1E40AF" />
                <rect x="360" y="270" width="80" height="40" rx="2" fill="#60A5FA">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </rect>
                {/* Code animé sur l'écran */}
                <g opacity="0.7">
                  <rect x="365" y="275" width="30" height="2" fill="#FFFFFF">
                    <animate attributeName="width" values="30;40;30" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <rect x="365" y="280" width="20" height="2" fill="#FFFFFF">
                    <animate attributeName="width" values="20;35;20" dur="2.5s" repeatCount="indefinite" />
                  </rect>
                </g>
              </g>

              {/* Ordinateur portable avec animations avancées */}
              <g className="animate-pulse-slow">
                {/* Base de l'ordinateur avec reflet */}
                <rect x="250" y="280" width="300" height="100" rx="10" fill="#93C5FD">
                  <animate attributeName="fill" values="#93C5FD;#A5B4FC;#93C5FD" dur="4s" repeatCount="indefinite" />
                </rect>
                <path d="M250 290 L550 290" stroke="#FFFFFF" strokeWidth="1" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0.7;0.5" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Barre de l'écran avec effet lumineux */}
                <rect x="250" y="300" width="300" height="20" rx="5" fill="#4F46E5">
                  <animate attributeName="fill" values="#4F46E5;#6366F1;#4F46E5" dur="3s" repeatCount="indefinite" />
                </rect>

                {/* Écran avec effet de code animé */}
                <rect x="270" y="290" width="260" height="80" rx="2" fill="#1E40AF" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.95;0.9" dur="2s" repeatCount="indefinite" />
                </rect>

                {/* Code animé avec effet de frappe */}
                <g className="animate-typing">
                  <rect x="280" y="300" width="40" height="4" rx="1" fill="#60A5FA">
                    <animate attributeName="width" values="0;40" dur="1s" repeatCount="indefinite" />
                  </rect>
                  <rect x="330" y="300" width="60" height="4" rx="1" fill="#818CF8">
                    <animate attributeName="width" values="0;60" dur="1.2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="280" y="310" width="80" height="4" rx="1" fill="#A5B4FC">
                    <animate attributeName="width" values="0;80" dur="0.8s" repeatCount="indefinite" />
                  </rect>
                  <rect x="280" y="320" width="50" height="4" rx="1" fill="#60A5FA">
                    <animate attributeName="width" values="0;50" dur="1.5s" repeatCount="indefinite" />
                  </rect>
                  <rect x="340" y="320" width="40" height="4" rx="1" fill="#818CF8">
                    <animate attributeName="width" values="0;40" dur="1.3s" repeatCount="indefinite" />
                  </rect>
                </g>

                {/* Reflets sur l'écran */}
                <path d="M270 290 L530 290" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
                </path>
              </g>

              {/* Accessoires de bureau */}
              <g className="animate-float-slow">
                <rect x="570" y="290" width="30" height="40" rx="2" fill="#F472B6" />
                <rect x="200" y="290" width="30" height="20" rx="2" fill="#34D399" />
              </g>
              
              {/* Icônes de compétences */}
              <circle cx="150" cy="150" r="25" fill="#F59E0B" opacity="0.9" className="animate-pulse">
                <title>Développement Web</title>
              </circle>
              <path d="M135 150 L165 150 M150 135 L150 165" stroke="#FFFFFF" strokeWidth="2" />
              
              <circle cx="650" cy="150" r="25" fill="#10B981" opacity="0.9" className="animate-pulse">
                <title>Design</title>
              </circle>
              <path d="M635 150 Q650 135 665 150 Q650 165 635 150" fill="#FFFFFF" />
              
              <circle cx="150" cy="450" r="25" fill="#6366F1" opacity="0.9" className="animate-pulse">
                <title>Base de données</title>
              </circle>
              <rect x="140" y="440" width="20" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              
              <circle cx="650" cy="450" r="25" fill="#EC4899" opacity="0.9" className="animate-pulse">
                <title>Gestion de Projet</title>
              </circle>
              <path d="M640 450 L660 450 M650 440 L650 460" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Lignes de connexion */}
              <path d="M150 150 Q300 200 250 300" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M650 150 Q500 200 550 300" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M150 450 Q300 400 250 380" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M650 450 Q500 400 550 380" stroke="#EC4899" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Plateforme de gestion des stages</h2>
          <p className="text-xl text-gray-600 mt-4">Connectez-vous à votre espace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
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
              <h3 className="text-2xl font-bold text-gray-900">Espace Étudiant</h3>
              <p className="text-gray-600 mt-2">Consultez vos stages et documents</p>
              <button className="mt-6 px-6 py-3 bg-orange-700 text-white rounded-xl hover:bg-orange-800 transition-colors">
                Connectez-vous
              </button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;