import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, Eye, Trash2, X, CheckCircle, XCircle } from 'lucide-react';

function DocumentManagement() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      titre: 'Rapport de stage final',
      type: 'rapport',
      stagiaire: 'Jean Dupont',
      dateSubmission: '2024-02-15',
      status: 'en_attente',
      commentaire: 'En attente de validation'
    },
    // Données de test
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    type: 'rapport',
    stagiaire: '',
    commentaire: ''
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.stagiaire.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDocument = () => {
    setSelectedDoc(null);
    setFormData({
      titre: '',
      type: 'rapport',
      stagiaire: '',
      commentaire: ''
    });
    setShowModal(true);
  };

  const handleViewDocument = (doc) => {
    // Implémenter la visualisation du document
    console.log('Visualiser le document:', doc);
  };

  const handleDownloadDocument = (doc) => {
    // Implémenter le téléchargement du document
    console.log('Télécharger le document:', doc);
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDoc) {
      // Mise à jour d'un document existant
      setDocuments(documents.map(doc =>
        doc.id === selectedDoc.id
          ? { ...doc, ...formData }
          : doc
      ));
    } else {
      // Ajout d'un nouveau document
      const newDoc = {
        id: documents.length + 1,
        ...formData,
        dateSubmission: new Date().toISOString().split('T')[0],
        status: 'en_attente'
      };
      setDocuments([...documents, newDoc]);
    }
    setShowModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Documents</h1>
        <button
          onClick={handleAddDocument}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un document
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table des documents */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stagiaire</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{doc.titre}</div>
                  <div className="text-sm text-gray-500">{doc.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doc.stagiaire}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(doc.dateSubmission).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(doc.status)}`}>
                    {doc.status === 'en_attente' ? 'En attente' : doc.status === 'valide' ? 'Validé' : 'Rejeté'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    title="Visualiser"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownloadDocument(doc)}
                    className="text-green-600 hover:text-green-900 mr-2"
                    title="Télécharger"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Supprimer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout de document */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[500px] shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedDoc ? 'Modifier le document' : 'Ajouter un document'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titre">
                  Titre du document
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Type de document
                </label>
                <select
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="rapport">Rapport de stage</option>
                  <option value="convention">Convention de stage</option>
                  <option value="evaluation">Évaluation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="commentaire">
                  Commentaire
                </label>
                <textarea
                  id="commentaire"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  value={formData.commentaire}
                  onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
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
                  {selectedDoc ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentManagement;