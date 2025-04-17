import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Tag, Trash2, Upload, X, Check, AlertCircle } from 'lucide-react';

function DocumentPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      nom: 'Convention_de_stage.pdf',
      type: 'convention',
      dateUpload: '2024-01-15',
      taille: '2.5 MB',
      status: 'en_attente',
      commentaire: ''
    }
  ]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});

  const tags = [
    { id: 'convention', label: 'Convention' },
    { id: 'rapport', label: 'Rapport' },
    { id: 'evaluation', label: 'Évaluation' },
    { id: 'attestation', label: 'Attestation' }
  ];

  const onDrop = useCallback((acceptedFiles) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    acceptedFiles.forEach(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, size: `Le fichier ${file.name} dépasse la taille maximale de 10MB` }));
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, type: `Le fichier ${file.name} n'est pas au format PDF ou DOCX` }));
        return;
      }

      if (selectedTags.length === 0) {
        setErrors(prev => ({ ...prev, tags: 'Veuillez sélectionner au moins un tag' }));
        return;
      }

      const newDocument = {
        id: Date.now(),
        nom: file.name,
        type: selectedTags[0],
        dateUpload: new Date().toISOString().split('T')[0],
        taille: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        status: 'en_attente',
        commentaire: ''
      };

      setDocuments(prev => [...prev, newDocument]);
      setErrors({});
    });
  }, [selectedTags]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const handleDeleteDocument = (documentId) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validé':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'refusé':
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

          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'}`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF ou DOCX uniquement (max. 10MB)
            </p>
          </div>

          {/* Error Messages */}
          {(errors.size || errors.type) && (
            <div className="mt-4 p-4 bg-red-50 rounded-md">
              {errors.size && <p className="text-sm text-red-600">{errors.size}</p>}
              {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
            </div>
          )}

          {/* Documents List */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documents téléchargés</h3>
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
                          <span className="ml-1">{doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;