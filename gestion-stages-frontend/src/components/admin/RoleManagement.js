import React, { useState } from 'react';
import { Shield, Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';

function RoleManagement() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Administrateur',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: [
        'user_manage',
        'role_manage',
        'data_manage',
        'account_manage',
        'import_export'
      ]
    },
    {
      id: 2,
      name: 'Formateur',
      description: 'Gestion des stagiaires et des stages',
      permissions: [
        'student_view',
        'student_manage',
        'internship_manage'
      ]
    },
    {
      id: 3,
      name: 'Stagiaire',
      description: 'Accès limité aux fonctionnalités de stage',
      permissions: [
        'internship_view',
        'document_view',
        'profile_manage'
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const availablePermissions = [
    { id: 'user_manage', name: 'Gestion des utilisateurs', description: 'Créer, modifier et supprimer des utilisateurs' },
    { id: 'role_manage', name: 'Gestion des rôles', description: 'Gérer les rôles et permissions' },
    { id: 'data_manage', name: 'Gestion des données', description: 'Accès complet aux données' },
    { id: 'account_manage', name: 'Gestion des comptes', description: 'Activer/désactiver les comptes' },
    { id: 'import_export', name: 'Import/Export', description: 'Importer et exporter des données' },
    { id: 'student_view', name: 'Voir les stagiaires', description: 'Consulter les informations des stagiaires' },
    { id: 'student_manage', name: 'Gérer les stagiaires', description: 'Modifier les informations des stagiaires' },
    { id: 'internship_manage', name: 'Gérer les stages', description: 'Gérer les stages et les affectations' },
    { id: 'internship_view', name: 'Voir les stages', description: 'Consulter les informations des stages' },
    { id: 'document_view', name: 'Voir les documents', description: 'Accéder aux documents' },
    { id: 'profile_manage', name: 'Gérer le profil', description: 'Modifier son profil personnel' }
  ];

  const handleAddRole = () => {
    setModalMode('add');
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setModalMode('edit');
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setShowModal(true);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newRole = {
        id: roles.length + 1,
        ...formData
      };
      setRoles([...roles, newRole]);
    } else {
      setRoles(roles.map(role =>
        role.id === selectedRole.id
          ? { ...role, ...formData }
          : role
      ));
    }
    setShowModal(false);
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Rôles et Permissions</h2>
        <button
          onClick={handleAddRole}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>Ajouter un rôle</span>
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un rôle..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des rôles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="text-indigo-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="text-gray-400 hover:text-indigo-600"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{role.description}</p>
            <div className="space-y-2">
              {role.permissions.map((permission) => {
                const permissionDetails = availablePermissions.find(p => p.id === permission);
                return (
                  <div key={permission} className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500" />
                    <span>{permissionDetails?.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout/modification de rôle */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {modalMode === 'add' ? 'Ajouter un rôle' : 'Modifier le rôle'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom du rôle</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => togglePermission(permission.id)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {modalMode === 'add' ? 'Ajouter' : 'Modifier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleManagement;