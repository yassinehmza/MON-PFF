import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Calendar, Building2, User2, FileText, Send } from 'lucide-react';

function StagePage() {
  const [stages, setStages] = useState([
    {
      id: 1,
      entreprise: 'Entreprise A',
      dateDebut: '2024-01-01',
      dateFin: '2024-02-28',
      tuteur: 'Jean Dupont',
      missions: 'Développement web et mobile',
      status: 'brouillon'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [formData, setFormData] = useState({
    entreprise: '',
    dateDebut: '',
    dateFin: '',
    tuteur: '',
    missions: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.entreprise) newErrors.entreprise = 'Le nom de l\'entreprise est requis';
    if (!formData.dateDebut) newErrors.dateDebut = 'La date de début est requise';
    if (!formData.dateFin) newErrors.dateFin = 'La date de fin est requise';
    if (!formData.tuteur) newErrors.tuteur = 'Le nom du tuteur est requis';
    if (!formData.missions) newErrors.missions = 'La description des missions est requise';
    if (formData.dateDebut && formData.dateFin && new Date(formData.dateDebut) > new Date(formData.dateFin)) {
      newErrors.dateFin = 'La date de fin doit être postérieure à la date de début';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (editingStage) {
      setStages(stages.map(stage =>
        stage.id === editingStage.id
          ? { ...formData, id: stage.id, status: stage.status }
          : stage
      ));
    } else {
      setStages([
        ...stages,
        {
          ...formData,
          id: Date.now(),
          status: 'brouillon'
        }
      ]);
    }

    setShowForm(false);
    setEditingStage(null);
    setFormData({
      entreprise: '',
      dateDebut: '',
      dateFin: '',
      tuteur: '',
      missions: ''
    });
  };

  const handleEdit = (stage) => {
    if (stage.status === 'brouillon') {
      setEditingStage(stage);
      setFormData({
        entreprise: stage.entreprise,
        dateDebut: stage.dateDebut,
        dateFin: stage.dateFin,
        tuteur: stage.tuteur,
        missions: stage.missions
      });
      setShowForm(true);
    }
  };

  const handleDelete = (stageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      setStages(stages.filter(stage => stage.id !== stageId));
    }
  };

  const handleSubmitStage = (stage) => {
    if (window.confirm('Voulez-vous soumettre ce stage pour validation ? Une fois soumis, vous ne pourrez plus le modifier.')) {
      setStages(stages.map(s =>
        s.id === stage.id
          ? { ...s, status: 'en_attente' }
          : s
      ));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'validé':
        return 'bg-green-100 text-green-800';
      case 'refusé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Stages</h1>
            <p className="mt-2 text-gray-600">Gérez vos stages et suivez leur statut</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingStage(null);
              setFormData({
                entreprise: '',
                dateDebut: '',
                dateFin: '',
                tuteur: '',
                missions: ''
              });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un stage
          </button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingStage ? 'Modifier le stage' : 'Ajouter un nouveau stage'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700">
                    Entreprise
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="entreprise"
                      value={formData.entreprise}
                      onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.entreprise ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.entreprise && <p className="mt-1 text-sm text-red-600">{errors.entreprise}</p>}
                </div>

                <div>
                  <label htmlFor="tuteur" className="block text-sm font-medium text-gray-700">
                    Tuteur
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="tuteur"
                      value={formData.tuteur}
                      onChange={(e) => setFormData({ ...formData, tuteur: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.tuteur ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.tuteur && <p className="mt-1 text-sm text-red-600">{errors.tuteur}</p>}
                </div>

                <div>
                  <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                    Date de début
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateDebut"
                      value={formData.dateDebut}
                      onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.dateDebut ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.dateDebut && <p className="mt-1 text-sm text-red-600">{errors.dateDebut}</p>}
                </div>

                <div>
                  <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateFin"
                      value={formData.dateFin}
                      onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.dateFin ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.dateFin && <p className="mt-1 text-sm text-red-600">{errors.dateFin}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="missions" className="block text-sm font-medium text-gray-700">
                  Missions
                </label>
                <div className="mt-1 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="missions"
                    rows="4"
                    value={formData.missions}
                    onChange={(e) => setFormData({ ...formData, missions: e.target.value })}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.missions ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>
                {errors.missions && <p className="mt-1 text-sm text-red-600">{errors.missions}</p>}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStage(null);
                    setFormData({
                      entreprise: '',
                      dateDebut: '',
                      dateFin: '',
                      tuteur: '',
                      missions: ''
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editingStage ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des stages */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{stage.entreprise}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                  {stage.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(stage.dateDebut).toLocaleDateString()} - {new Date(stage.dateFin).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <User2 className="h-5 w-5 mr-2" />
                  <span>{stage.tuteur}</span>
                </div>

                <div className="text-gray-600">
                  <FileText className="h-5 w-5 mr-2 inline" />
                  <p className="mt-1">{stage.missions}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                {stage.status === 'brouillon' && (
                  <>
                    <button
                      onClick={() => handleEdit(stage)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Modifier"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(stage.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleSubmitStage(stage)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Soumettre pour validation"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </>
                )}
                {stage.status === 'refusé' && stage.commentaire && (
                  <div className="text-sm text-red-600 mt-2">
                    <p className="font-medium">Motif du refus :</p>
                    <p>{stage.commentaire}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StagePage;