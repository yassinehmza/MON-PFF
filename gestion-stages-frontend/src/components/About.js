import React from 'react';
import aboutImage from '../assets/apropos.png';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">À PROPOS DE STAGE</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Texte à gauche */}
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Le projet de fin d'étude:</h3>
            <p className="text-gray-600 leading-relaxed">
              Le PFE sert avant toute chose à mettre un pied dans le monde de l'entreprise. 
              En effet, ces six mois en moyenne de stage font office de transition entre la vie 
              étudiante et la vie active. C'est pourquoi il est important de bien le choisir! 
              Le stage de fin d'études a pour vocation de développer chez le stagiaire des 
              savoir-faire et des savoir-être essentiels pour son avenir professionnel.
            </p>
            <div className="mt-6">
              <div className="flex items-start space-x-4 mb-4">
                <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">
                  Le PFE, projet de fin d'études, et le stage de fin d'études recouvrent une même réalité. 
                  Il s'agit d'une période déterminée durant laquelle l'étudiant rejoint une entreprise 
                  afin de réaliser un projet. Le PFE marque la fin du cursus en école d'ingénieur ou à 
                  l'université. Le stage de fin d'études correspond au cadre légal dans lequel s'effectue 
                  le projet de fin d'études.
                </p>
              </div>
            </div>
          </div>

          {/* Image à droite */}
          <div className="lg:w-1/2">
            <img 
              src={aboutImage} 
              alt="À propos de stage" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;