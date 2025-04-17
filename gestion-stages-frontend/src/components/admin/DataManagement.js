import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet, Trash2, Search, AlertCircle } from 'lucide-react';

function DataManagement() {
  const [files, setFiles] = useState([
    { 
      id: 1, 
      name: 'stages_2024.csv', 
      type: 'CSV',
      size: '2.5 MB',
      uploadedAt: '2024-01-15 10:30',
      status: 'Importé'
    },
    { 
      id: 2, 
      name: 'utilisateurs.xlsx', 
      type: 'Excel',
      size: '1.8 MB',
      uploadedAt: '2024-01-14 15:45',
      status: 'En attente'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [importErrors, setImportErrors] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadFile(file);
      setShowUploadModal(true);
    }
  };

  const handleImport = () => {
    // Simuler l'import avec un délai
    setTimeout(() => {
      const newFile = {
        id: files.length + 1,
        name: uploadFile.name,
        type: uploadFile.name.endsWith('.csv') ? 'CSV' : 'Excel',
        size: `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toLocaleString(),
        status: 'Importé'
      };
      setFiles([...files, newFile]);
      setShowUploadModal(false);
      setUploadFile(null);
    }, 1500);
  };

  const handleExport = (fileId) => {
    // Logique d'export à implémenter
    console.log('Exporting file:', fileId);
  };

  const handleDelete = (fileId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      setFiles(files.filter(file => file.id !== fileId));
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = 
      file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = 
      selectedFileType === 'all' || 
      file.type.toLowerCase() === selectedFileType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Données</h2>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value)}
          >
            <option value="all">Tous les types</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
          </select>
          <label className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
            <Upload size={20} />
            <span>Importer</span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un fichier..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des fichiers */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du fichier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'import</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFiles.map((file) => (
              <tr key={file.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileSpreadsheet className="text-gray-500 mr-2" size={20} />
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{file.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{file.size}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{file.uploadedAt}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      file.status === 'Importé'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {file.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExport(file.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Exporter"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'import */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Importer le fichier</h3>
              <p className="text-sm text-gray-600">{uploadFile.name}</p>
            </div>

            {importErrors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2 text-red-800 mb-2">
                  <AlertCircle size={20} />
                  <span className="font-medium">Erreurs détectées</span>
                </div>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {importErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Importer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques d'import/export */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {files.filter(f => f.status === 'Importé').length}
              </h4>
              <p className="text-gray-500">Fichiers importés</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-yellow-100">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {files.filter(f => f.status === 'En attente').length}
              </h4>
              <p className="text-gray-500">En attente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-blue-100">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {/* Nombre d'exports à implémenter */}
                0
              </h4>
              <p className="text-gray-500">Fichiers exportés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataManagement;