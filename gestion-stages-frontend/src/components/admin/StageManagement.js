import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminNavigation from './AdminNavigation'; // Adjust the import path as needed

const StageManagement = () => {
  const [stages, setStages] = useState([]);
  const [formData, setFormData] = useState({
    titre: '',
    id_stagiaire: '',
    id_formateur: '',
    id_entreprise: '',
    date_debut: '',
    date_fin: '',
    description: '',
    status: 'en_attente',
    encadrant_entreprise: '',
    contact_encadrant: ''
  });
  const [selectedStage, setSelectedStage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch stages on component load
  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await api.get('/stages');
        const data = response.data;
        if (Array.isArray(data)) {
          setStages(data);
        } else {
          setStages([]);
          console.error("Error fetching stages:", data.message || data);
        }
      } catch (error) {
        setStages([]);
        console.error("Error fetching stages:", error.response?.data?.message || error.message || error);
      }
    };

    fetchStages();
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = selectedStage ? 'PUT' : 'POST';
      const url = selectedStage
        ? `/stages/${selectedStage.id}`
        : '/stages';

      console.log('Submitting formData:', formData);
      let response;
      if (method === 'PUT') {
        response = await api.put(url, formData);
      } else {
        response = await api.post(url, formData);
      }
      const data = response.data;
      // Success: update the UI
      if (selectedStage) {
        setStages(stages.map(stage => (stage.id === data.id ? data : stage)));
      } else {
        setStages([...stages, data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting stage:", error.response?.data?.message || error.message || error);
    }
  };

  // Handle edit stage
  const handleEditStage = (stage) => {
    setSelectedStage(stage);
    setFormData({
      titre: stage.titre || '',
      id_stagiaire: stage.id_stagiaire || '',
      id_formateur: stage.id_formateur || '',
      id_entreprise: stage.id_entreprise || '',
      date_debut: stage.date_debut || '',
      date_fin: stage.date_fin || '',
      description: stage.description || '',
      status: stage.status || 'en_attente',
      encadrant_entreprise: stage.encadrant_entreprise || '',
      contact_encadrant: stage.contact_encadrant || ''
    });
    setShowModal(true);
  };

  // Handle delete stage
  const handleDeleteStage = async (stageId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stage ?')) {
      try {
        const response = await api.delete(`/stages/${stageId}`);
        if (response.status === 200 || response.status === 204) {
          setStages(stages.filter(stage => stage.id !== stageId));
        } else {
          console.error('Failed to delete stage');
        }
      } catch (error) {
        console.error('Error deleting stage:', error.response?.data?.message || error.message || error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with AdminNavigation */}
      <div className="w-64 bg-gray-800 text-white">
        <AdminNavigation />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Gestion des stages</h1>
          <button
            onClick={() => {
              console.log('Adding a new stage');
              setSelectedStage(null);
              setFormData({
                titre: '',
                id_stagiaire: '',
                id_formateur: '',
                id_entreprise: '',
                date_debut: '',
                date_fin: '',
                description: '',
                status: 'en_attente',
                encadrant_entreprise: '',
                contact_encadrant: ''
              });
              setShowModal(true);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
          >
            Ajouter un stage
          </button>

          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Titre</th>
                <th className="px-4 py-2 border">Date de début</th>
                <th className="px-4 py-2 border">Date de fin</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stages.map(stage => (
                <tr key={stage.id} className="odd:bg-gray-50">
                  <td className="px-4 py-2 border">{stage.titre}</td>
                  <td className="px-4 py-2 border">{stage.date_debut}</td>
                  <td className="px-4 py-2 border">{stage.date_fin}</td>
                  <td className="px-4 py-2 border">{stage.status}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEditStage(stage)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                    >
                      Editer
                    </button>
                    <button
                      onClick={() => handleDeleteStage(stage.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal to add/edit stage */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">{selectedStage ? 'Modifier le stage' : 'Ajouter un stage'}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Titre</label>
                      <input
                        type="text"
                        name="titre"
                        value={formData.titre}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Stagiaire ID</label>
                      <input
                        type="number"
                        name="id_stagiaire"
                        value={formData.id_stagiaire}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Formateur ID</label>
                      <input
                        type="number"
                        name="id_formateur"
                        value={formData.id_formateur}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Entreprise ID</label>
                      <input
                        type="number"
                        name="id_entreprise"
                        value={formData.id_entreprise}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Date de début</label>
                      <input
                        type="date"
                        name="date_debut"
                        value={formData.date_debut}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Date de fin</label>
                      <input
                        type="date"
                        name="date_fin"
                        value={formData.date_fin}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4 md:col-span-2">
                      <label className="block font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="3"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="en_attente">En attente</option>
                        <option value="en_cours">En cours</option>
                        <option value="termine">Terminé</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Encadrant entreprise</label>
                      <input
                        type="text"
                        name="encadrant_entreprise"
                        value={formData.encadrant_entreprise}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-2">Contact encadrant</label>
                      <input
                        type="text"
                        name="contact_encadrant"
                        value={formData.contact_encadrant}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {selectedStage ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 text-black py-2 px-4 rounded ml-2 hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageManagement;