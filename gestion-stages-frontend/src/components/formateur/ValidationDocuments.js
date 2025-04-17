import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, MessageSquare, History } from 'lucide-react';

function ValidationDocuments() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [commentaire, setCommentaire] = useState('');

  const documents = [
    {
      id: 1,
      titre: 'Rapport de stage - Semaine 1',
      stagiaire: 'Sophie Martin',
      dateDepot: '2024-01-15',
      statut: 'en_attente',
      type: 'pdf',
      url: '#',
    },
    {
      id: 2,
      titre: 'Évaluation mi-parcours',
      stagiaire: 'Lucas Dubois',
      dateDepot: '2024-01-18',
      statut: 'en_attente',
      type: 'pdf',
      url: '#',
    },
    {
      id: 3,
      titre: 'Journal de bord - Janvier',
      stagiaire: 'Emma Garcia',
      dateDepot: '2024-01-20',
      statut: 'en_retard',
      type: 'pdf',
      url: '#',
    },
  ];

  const historique = [
    {
      id: 1,
      titre: 'Rapport initial',
      stagiaire: 'Sophie Martin',
      dateValidation: '2024-01-10',
      statut: 'valide',
      commentaire: 'Excellent travail, bien structuré',
    },
    {
      id: 2,
      titre: 'Plan de stage',
      stagiaire: 'Lucas Dubois',
      dateValidation: '2024-01-12',
      statut: 'rejete',
      commentaire: 'À revoir : objectifs pas assez détaillés',
    },
  ];

  const getStatutBadgeClass = (statut) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'rejete':
        return 'bg-red-100 text-red-800';
      case 'en_retard':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'en_attente':
        return 'En attente';
      case 'valide':
        return 'Validé';
      case 'rejete':
        return 'Rejeté';
      case 'en_retard':
        return 'En retard';
      default:
        return 'Inconnu';
    }
  };

  const handleValidation = (documentId, action) => {
    console.log(`Document ${documentId} ${action === 'valider' ? 'validé' : 'rejeté'} avec commentaire:`, commentaire);
    setCommentaire('');
    setSelectedDocument(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Validation des Documents</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Documents en attente</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {documents.map((document) => (
              <li
                key={document.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedDocument(document)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{document.titre}</p>
                      <p className="text-sm text-gray-500">{document.stagiaire}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutBadgeClass(document.statut)}`}>
                      {getStatutLabel(document.statut)}
                    </span>
                    <span className="text-sm text-gray-500">{document.dateDepot}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedDocument && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Validation du document</h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900">Document sélectionné</h4>
                <p className="mt-1 text-sm text-gray-600">{selectedDocument.titre}</p>
                <p className="text-sm text-gray-500">{selectedDocument.stagiaire}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700">
                  Commentaire
                </label>
                <textarea
                  id="commentaire"
                  rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleValidation(selectedDocument.id, 'valider')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Valider
                </button>
                <button
                  onClick={() => handleValidation(selectedDocument.id, 'rejeter')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Historique des validations</h3>
            <History className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="divide-y divide-gray-200">
            {historique.map((item) => (
              <li key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.titre}</p>
                    <p className="text-sm text-gray-500">{item.stagiaire}</p>
                    <div className="flex items-center mt-1">
                      <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-600">{item.commentaire}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutBadgeClass(item.statut)}`}>
                      {getStatutLabel(item.statut)}
                    </span>
                    <span className="text-sm text-gray-500">{item.dateValidation}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ValidationDocuments;