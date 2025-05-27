import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  FileText,
  User,
  Calendar,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MessageCircle
} from 'lucide-react';
import axios from 'axios';

function StagiairesPopup({ isOpen, onClose }) {
  const [stagiaires, setStagiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStagiaire, setSelectedStagiaire] = useState(null);

  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const response = await axios.get('/api/formateur/stagiaires', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStagiaires(response.data.stagiaires);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Une erreur est survenue');
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchStagiaires();
    }
  }, [isOpen]);

  const filteredStagiaires = stagiaires.filter(stagiaire =>
    `${stagiaire.nom} ${stagiaire.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stagiaire.filiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'valide':
        return 'text-green-600';
      case 'refuse':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case 'valide':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'refuse':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const handleValidateDocument = async (documentId, status, comment = '') => {
    try {
      await axios.put(`/api/formateur/documents/${documentId}/validate`, {
        status,
        commentaire: comment
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Refresh stagiaires data
      const response = await axios.get('/api/formateur/stagiaires', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStagiaires(response.data.stagiaires);
    } catch (err) {
      console.error('Error validating document:', err);
    }
  };

  const handleDownloadDocument = async (documentId, fileName) => {
    try {
      const response = await axios.get(`/api/formateur/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading document:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Stagiaires</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un stagiaire..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-4">{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredStagiaires.map((stagiaire) => (
                <div
                  key={stagiaire.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {stagiaire.prenom} {stagiaire.nom}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {stagiaire.filiere}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(stagiaire.stage.date_debut).toLocaleDateString()} - {new Date(stagiaire.stage.date_fin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Documents</h4>
                    <div className="space-y-2">
                      {stagiaire.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.type}</p>
                              <p className="text-sm text-gray-500">
                                Déposé le {new Date(doc.date_depot).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getDocumentStatusIcon(doc.status)}
                            <button
                              onClick={() => handleDownloadDocument(doc.id, doc.nom_fichier)}
                              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                            {doc.status === 'en_attente' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleValidateDocument(doc.id, 'valide')}
                                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => {
                                    const comment = prompt('Motif du refus:');
                                    if (comment) handleValidateDocument(doc.id, 'refuse', comment);
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <XCircle className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                            {doc.commentaire && (
                              <div className="relative group">
                                <MessageCircle className="h-5 w-5 text-gray-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-sm rounded-lg">
                                  {doc.commentaire}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StagiairesPopup;