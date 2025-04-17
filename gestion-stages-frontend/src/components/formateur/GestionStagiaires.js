import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Building, Calendar, User } from 'lucide-react';

function GestionStagiaires() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');

  const stagiaires = [
    {
      id: 1,
      nom: 'Martin',
      prenom: 'Sophie',
      entreprise: 'Tech Solutions',
      dateDebut: '2024-01-10',
      dateFin: '2024-06-10',
      statut: 'en_cours',
    },
    {
      id: 2,
      nom: 'Dubois',
      prenom: 'Lucas',
      entreprise: 'Digital Agency',
      dateDebut: '2024-02-01',
      dateFin: '2024-07-01',
      statut: 'en_cours',
    },
    {
      id: 3,
      nom: 'Garcia',
      prenom: 'Emma',
      entreprise: 'Web Services',
      dateDebut: '2024-03-15',
      dateFin: '2024-08-15',
      statut: 'a_venir',
    },
  ];

  const filteredStagiaires = stagiaires.filter(stagiaire => {
    const matchSearch = 
      stagiaire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stagiaire.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stagiaire.entreprise.toLowerCase().includes(searchTerm.toLowerCase());

    const matchFilter = filterStatus === 'tous' || stagiaire.statut === filterStatus;

    return matchSearch && matchFilter;
  });

  const getStatutBadgeClass = (statut) => {
    switch (statut) {
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      case 'a_venir':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'en_cours':
        return 'En cours';
      case 'termine':
        return 'Terminé';
      case 'a_venir':
        return 'À venir';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Stagiaires</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un stagiaire..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="tous">Tous les statuts</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="a_venir">À venir</option>
          </select>
          <Filter className="h-5 w-5 text-gray-400 absolute right-32 top-2.5" />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredStagiaires.map((stagiaire) => (
            <li
              key={stagiaire.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer p-6"
              onClick={() => console.log('Naviguer vers le profil', stagiaire.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {stagiaire.prenom} {stagiaire.nom}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-gray-500">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{stagiaire.entreprise}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(stagiaire.dateDebut).toLocaleDateString()} - {new Date(stagiaire.dateFin).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatutBadgeClass(stagiaire.statut)}`}>
                    {getStatutLabel(stagiaire.statut)}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GestionStagiaires;