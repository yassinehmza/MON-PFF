import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, FileText, X, CheckCircle, XCircle } from 'lucide-react';

function StageManagement() {
  const [stages, setStages] = useState([
    {
      id: 1,
      titre: 'Stage développement web',
      stagiaire: 'Jean Dupont',
      formateur: 'Marie Martin',
      dateDebut: '2024-01-15',
      dateFin: '2024-06-15',
      status: 'en_cours',
      entreprise: 'TechCorp',
      description: 'Stage de développement web full-stack'
    },
    // Données de test
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    stagiaire: '',
    formateur: '',
    dateDebut: '',
    dateFin: '',
    entreprise: '',
    description: ''
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStages = stages.filter(stage =>
    stage.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.stagiaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStage = () => {
    setSelectedStage(null);
    setFormData({
      titre: '',
      stagiaire: '',
      formateur: '',
      dateDebut: '',
      dateFin: '',
      entreprise: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleEditStage = (stage) => {
    setSelectedStage(stage);
    setFormData({
      titre: stage.titre,
      stagiaire: stage.stagiaire,
      formateur: stage.formateur,
      dateDebut: stage.dateDebut,
      dateFin: stage.dateFin,
      entreprise: stage.entreprise,
      description: stage.description
    });
    setShowModal(true);
  };

  const handleDeleteStage = (stageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      setStages(stages.filter(stage => stage.id !== stageId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStage) {
      // Mise à jour d'un stage existant
      setStages(stages.map(stage =>
        stage.id === selectedStage.id
          ? { ...stage, ...formData }
          : stage
      ));
    } else {
      // Ajout d'un nouveau stage
      const newStage = {
        id: stages.length + 1,
        ...formData,
        status: 'en_cours'
      };
      setStages([...stages, newStage]);
    }
    setShowModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'termine':
        return 'bg-blue-100 text-blue-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Stages</h1>
        <button
          onClick={handleAddStage}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un stage
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un stage..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table des stages */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stagiaire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStages.map((stage) => (
              <tr key={stage.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{stage.titre}</div>
                  <div className="text-sm text-gray-500">{stage.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{stage.stagiaire}</div>
                  <div className="text-sm text-gray-500">Encadré par: {stage.formateur}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{stage.entreprise}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(stage.dateDebut).toLocaleDateString()} - {new Date(stage.dateFin).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(stage.status)}`}>
                    {stage.status === 'en_cours' ? 'En cours' : stage.status === 'termine' ? 'Terminé' : 'Annulé'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditStage(stage)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStage(stage.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout/modification de stage */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedStage ? 'Modifier le stage' : 'Ajouter un stage'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titre">
                  Titre du stage
                </label>
                <input
                  type="text"
                  id="titre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stagiaire">
                  Stagiaire
                </label>
                <input
                  type="text"
                  id="stagiaire"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.stagiaire}
                  onChange={(e) => setFormData({ ...formData, stagiaire: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formateur">
                  Formateur
                </label>
                <input
                  type="text"
                  id="formateur"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.formateur}
                  onChange={(e) => setFormData({ ...formData, formateur: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateDebut">
                  Date de début
                </label>
                <input
                  type="date"
                  id="dateDebut"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.dateDebut}
                  onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateFin">
                  Date de fin
                </label>
                <input
                  type="date"
                  id="dateFin"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.dateFin}
                  onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entreprise">
                  Entreprise
                </label>
                <input
                  type="text"
                  id="entreprise"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.entreprise}
                  onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {selectedStage ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StageManagement;