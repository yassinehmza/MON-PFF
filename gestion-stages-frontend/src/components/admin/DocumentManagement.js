import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, Eye, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import AdminNavigation from './AdminNavigation'; // Adjust import path as needed

function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    type: 'rapport',
    commentaire: '',
    file: null,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch documents from API on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/documents');
        setDocuments(response.data.documents || []);
      } catch (error) {
        console.error('Erreur lors du chargement des documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    (doc.titre || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDocument = () => {
    setSelectedDoc(null);
    setFormData({
      titre: '',
      type: 'rapport',
      commentaire: '',
      file: null,
    });
    setShowModal(true);
  };

  const handleViewDocument = (doc) => {
    console.log('Visualiser le document:', doc);
  };

  const handleDownloadDocument = async (doc) => {
    try {
      const response = await api.get(`/documents/${doc.id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.nom_fichier || 'document');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await api.delete(`/documents/${docId}`);
        setDocuments(documents.filter(doc => doc.id !== docId));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDoc) {
        // Update existing document (file update not handled here)
        const response = await api.put(`/documents/${selectedDoc.id}`, formData);
        setDocuments(documents.map(doc => 
          doc.id === selectedDoc.id ? response.data.document : doc
        ));
      } else {
        // Create new document with file upload
        const data = new FormData();
        data.append('type', formData.type);
        data.append('commentaire', formData.commentaire);
        // Admin: stage_id null or 0
        data.append('stage_id', '');
        if (formData.file) {
          data.append('file', formData.file);
        }
        // Optionally add other fields if needed
        const response = await api.post('/documents', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setDocuments([...documents, response.data.document]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };


  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'valide': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'rejete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-800 text-white">
        <AdminNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
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

        {/* Search Bar */}
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

        {/* Documents Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
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

        {/* Add/Edit Document Modal */}
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
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                    Fichier à uploader
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                    required={!selectedDoc}
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
    </div>
  );
}

export default DocumentManagement;