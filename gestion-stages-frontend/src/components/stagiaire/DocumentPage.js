import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Tag, Trash2, Upload, X, Check, AlertCircle } from 'lucide-react';
import api from '../../services/api';

function DocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const tags = [
    { id: 'convention', label: 'Convention' },
    { id: 'rapport', label: 'Rapport' },
    { id: 'evaluation', label: 'Évaluation' },
    { id: 'attestation', label: 'Attestation' }
  ];

  // Fetch documents from the backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await api.get('/etudiant/documents');
        
        // Check if we have documents
        if (response.data.documents && Array.isArray(response.data.documents)) {
          // Format the documents to match our frontend structure
          const formattedDocs = response.data.documents.map(doc => ({
            id: doc.id,
            nom: doc.nom_fichier,
            type: doc.type,
            dateUpload: new Date(doc.date_depot).toISOString().split('T')[0],
            taille: doc.taille || 'N/A',
            status: doc.status,
            commentaire: doc.commentaire || ''
          }));
          
          setDocuments(formattedDocs);
        } else {
          setDocuments([]);
        }
        
        // Check if there's a message from the backend
        if (response.data.message) {
          setErrors(prev => ({ ...prev, stage: response.data.message }));
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        const errorMessage = error.response?.data?.error || 'Erreur lors du chargement des documents';
        setErrors(prev => ({ ...prev, fetch: errorMessage }));
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    // Reset errors and success message
    setErrors({});
    setSuccessMessage('');

    for (const file of acceptedFiles) {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, size: `Le fichier ${file.name} dépasse la taille maximale de 10MB` }));
        continue;
      }

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, type: `Le fichier ${file.name} n'est pas au format PDF ou DOCX` }));
        continue;
      }

      if (selectedTags.length === 0) {
        setErrors(prev => ({ ...prev, tags: 'Veuillez sélectionner au moins un tag' }));
        continue;
      }

      try {
        setUploading(true);
        
        // Create form data for file upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', selectedTags[0]);
        
        console.log('Uploading file:', file.name, 'type:', selectedTags[0]);
        
        // Upload the document - don't set Content-Type header, let axios set it with boundary
        const response = await api.post('/etudiant/documents', formData);
        
        // Add the new document to the list
        const newDocument = {
          id: response.data.document.id,
          nom: response.data.document.nom_fichier,
          type: response.data.document.type,
          dateUpload: new Date(response.data.document.date_depot).toISOString().split('T')[0],
          taille: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          status: response.data.document.status,
          commentaire: response.data.document.commentaire || ''
        };
        
        setDocuments(prev => [...prev, newDocument]);
        setSuccessMessage('Document téléchargé avec succès');
      } catch (error) {
        console.error('Error uploading document:', error);
        // Get detailed error message from the response if available
        const errorMessage = error.response?.data?.errors 
          ? Object.values(error.response.data.errors).flat().join(', ')
          : error.response?.data?.error || `Erreur lors du téléchargement de ${file.name}`;
        
        setErrors(prev => ({ ...prev, upload: errorMessage }));
      } finally {
        setUploading(false);
      }
    }
  }, [selectedTags]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const handleDeleteDocument = async (documentId) => {
    try {
      await api.delete(`/etudiant/documents/${documentId}`);
      setDocuments(documents.filter(doc => doc.id !== documentId));
      setSuccessMessage('Document supprimé avec succès');
    } catch (error) {
      console.error('Error deleting document:', error);
      setErrors(prev => ({ ...prev, delete: 'Erreur lors de la suppression du document' }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'refuse':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valide':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'refuse':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Documents</h2>
          
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}
          
          {/* Tags Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Type de document</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => {
                    if (selectedTags.includes(tag.id)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag.id));
                    } else {
                      setSelectedTags([tag.id]);
                    }
                    setErrors(prev => ({ ...prev, tags: null }));
                  }}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedTags.includes(tag.id) ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  <Tag className="h-4 w-4 mr-1" />
                  {tag.label}
                </button>
              ))}
            </div>
            {errors.tags && <p className="mt-2 text-sm text-red-600">{errors.tags}</p>}
          </div>

          {/* Stage Warning */}
          {errors.stage && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-700">
                <strong>Attention:</strong> {errors.stage}. Vous devez d'abord créer un stage pour pouvoir télécharger des documents.
              </p>
              <a href="/etudiant/stage" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Créer un stage
              </a>
            </div>
          )}
          
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'} ${uploading || errors.stage ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} disabled={uploading || errors.stage} />
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              {uploading ? 'Téléchargement en cours...' : 'Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner'}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF ou DOCX uniquement (max. 10MB)
            </p>
            {errors.stage && (
              <p className="mt-2 text-xs text-red-500">
                Vous devez d'abord créer un stage pour télécharger des documents
              </p>
            )}
          </div>

          {/* Error Messages */}
          {Object.keys(errors).filter(key => key !== 'stage').length > 0 && (
            <div className="mt-4 p-4 bg-red-50 rounded-md">
              {Object.entries(errors)
                .filter(([key]) => key !== 'stage')
                .map(([key, error], index) => (
                  <p key={index} className="text-sm text-red-600">{error}</p>
                ))
              }
            </div>
          )}

          {/* Documents List */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documents téléchargés</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Chargement des documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-600">Aucun document trouvé</p>
                <p className="text-sm text-gray-500">Téléchargez votre premier document en utilisant le formulaire ci-dessus</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-indigo-500" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.nom}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{doc.taille}</span>
                          <span>•</span>
                          <span>{doc.dateUpload}</span>
                          <span>•</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {getStatusIcon(doc.status)}
                            <span className="ml-1">{doc.status === 'en_attente' ? 'En attente' : doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</span>
                          </span>
                        </div>
                        {doc.commentaire && (
                          <p className="mt-1 text-sm text-gray-600">
                            <span className="font-medium">Commentaire:</span> {doc.commentaire}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      disabled={uploading}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;