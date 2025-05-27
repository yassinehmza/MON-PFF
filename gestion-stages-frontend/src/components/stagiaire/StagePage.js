import React, { useState, useEffect } from 'react';
import api, { fetchFormateurs, fetchEntreprises, submitStage } from '../../services/api';
import { Plus, Edit2, Trash2, Check, X, Calendar, Building2, User2, FileText, Send } from 'lucide-react';

function StagePage() {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await api.get('/etudiant/stages');
        setStages(response.data.stages || []);
      } catch (error) {}
    };
    fetchStages();

    // Fetch formateurs and entreprises for dropdowns
    const fetchDropdowns = async () => {
      try {
        const [formateursRes, entreprisesRes] = await Promise.all([
          fetchFormateurs(),
          fetchEntreprises()
        ]);
        setFormateurs(formateursRes.data.formateurs || []);
        // Only keep entreprises with a valid id
        const validEntreprises = (entreprisesRes.data.entreprises || []).filter(ent => ent.id && ent.id !== 0 && ent.id !== '0');
        setEntreprises(validEntreprises);
      } catch (error) {
        // If entreprises endpoint 404s, ignore and set empty
        setEntreprises([]);
      }
    };
    fetchDropdowns();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  // Initialize all form fields with empty strings instead of undefined
  const [formData, setFormData] = useState({
    id_formateur: '',
    id_entreprise: '',
    date_debut: '',
    date_fin: '',
    description: '',
    evaluation: '',
    encadrant_entreprise: '',
    contact_encadrant: ''
  });

  const [formateurs, setFormateurs] = useState([]);
  const [entreprises, setEntreprises] = useState([]);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id_formateur) newErrors.id_formateur = 'Le formateur est requis';
    if (!formData.id_entreprise) newErrors.id_entreprise = 'L\'entreprise est requise';
    if (!formData.date_debut) newErrors.date_debut = 'La date de début est requise';
    if (!formData.date_fin) newErrors.date_fin = 'La date de fin est requise';
    if (!formData.description) newErrors.description = 'La description est requise';
    if (!formData.encadrant_entreprise) newErrors.encadrant_entreprise = 'Le nom de l\'encadrant est requis';
    if (!formData.contact_encadrant) newErrors.contact_encadrant = 'Le contact de l\'encadrant est requis';
    if (formData.date_debut && formData.date_fin && new Date(formData.date_debut) > new Date(formData.date_fin)) {
      newErrors.date_fin = 'La date de fin doit être postérieure à la date de début';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let response;
      if (editingStage) {
        response = await api.put(`/etudiant/stages/${editingStage.id}`, formData);
        setStages(stages.map(stage =>
          stage.id === editingStage.id ? response.data.stage : stage
        ));
      } else {
        response = await submitStage(formData);
        setStages([...stages, response.data.stage]);
      }
      setShowForm(false);
      setEditingStage(null);
      setFormData({
        id_formateur: '',
        id_entreprise: '',
        date_debut: '',
        date_fin: '',
        description: '',
        evaluation: '',
        encadrant_entreprise: '',
        contact_encadrant: ''
      });
      setErrors({});
    } catch (error) {
      setErrors(error.response?.data?.errors || { submit: 'Erreur lors de la sauvegarde du stage' });
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
    try {
      await api.delete(`/etudiant/stages/${id}`);
      setStages(stages.filter(stage => stage.id !== id));
    } catch (error) {
      // Optionally handle error
    }
  }
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
                  <label htmlFor="id_entreprise" className="block text-sm font-medium text-gray-700">
                    Entreprise
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="id_entreprise"
                      value={formData.id_entreprise}
                      onChange={e => setFormData({ ...formData, id_entreprise: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.id_entreprise ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="">Sélectionner une entreprise</option>
                      {entreprises.map(ent => (
                        <option key={ent.id} value={ent.id}>{ent.nom}</option>
                      ))}
                    </select>
                  </div>
                  {errors.id_entreprise && <p className="mt-1 text-sm text-red-600">{errors.id_entreprise}</p>}
                </div>

                <div>
                  <label htmlFor="id_formateur" className="block text-sm font-medium text-gray-700">
                    Formateur
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="id_formateur"
                      value={formData.id_formateur}
                      onChange={e => setFormData({ ...formData, id_formateur: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.id_formateur ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="">Sélectionner un formateur</option>
                      {formateurs.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  {errors.id_formateur && <p className="mt-1 text-sm text-red-600">{errors.id_formateur}</p>}
                </div>

                <div>
                  <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700">
                    Date de début
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date_debut"
                      value={formData.date_debut}
                      onChange={e => setFormData({ ...formData, date_debut: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.date_debut ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.date_debut && <p className="mt-1 text-sm text-red-600">{errors.date_debut}</p>}
                </div>

                <div>
                  <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date_fin"
                      value={formData.date_fin}
                      onChange={e => setFormData({ ...formData, date_fin: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border ${errors.date_fin ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.date_fin && <p className="mt-1 text-sm text-red-600">{errors.date_fin}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="description"
                    rows="4"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="encadrant_entreprise" className="block text-sm font-medium text-gray-700">
                    Encadrant entreprise
                  </label>
                  <input
                    type="text"
                    id="encadrant_entreprise"
                    value={formData.encadrant_entreprise}
                    onChange={e => setFormData({ ...formData, encadrant_entreprise: e.target.value })}
                    className={`block w-full pr-3 py-2 border ${errors.encadrant_entreprise ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.encadrant_entreprise && <p className="mt-1 text-sm text-red-600">{errors.encadrant_entreprise}</p>}
                </div>
                <div>
                  <label htmlFor="contact_encadrant" className="block text-sm font-medium text-gray-700">
                    Contact encadrant
                  </label>
                  <input
                    type="text"
                    id="contact_encadrant"
                    value={formData.contact_encadrant}
                    onChange={e => setFormData({ ...formData, contact_encadrant: e.target.value })}
                    className={`block w-full pr-3 py-2 border ${errors.contact_encadrant ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.contact_encadrant && <p className="mt-1 text-sm text-red-600">{errors.contact_encadrant}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="evaluation" className="block text-sm font-medium text-gray-700">
                  Évaluation (optionnel)
                </label>
                <input
                  type="text"
                  id="evaluation"
                  value={formData.evaluation}
                  onChange={e => setFormData({ ...formData, evaluation: e.target.value })}
                  className="block w-full pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
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