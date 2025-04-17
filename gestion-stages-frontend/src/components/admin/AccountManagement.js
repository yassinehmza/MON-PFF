import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

function AccountManagement() {
  const [accounts, setAccounts] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'Formateur', 
      status: 'Actif',
      lastLogin: '2024-01-15 10:30',
      createdAt: '2024-01-01'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'Stagiaire', 
      status: 'Inactif',
      lastLogin: '2024-01-14 15:45',
      createdAt: '2024-01-01'
    },
    // Ajouter plus de comptes pour la démonstration
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleStatusChange = (accountId, newStatus) => {
    setAccounts(accounts.map(account =>
      account.id === accountId
        ? { ...account, status: newStatus }
        : account
    ));
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      selectedStatus === 'all' || 
      account.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Comptes</h2>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
            <option value="suspendu">Suspendu</option>
          </select>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un compte..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table des comptes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière Connexion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.status === 'Actif'
                        ? 'bg-green-100 text-green-800'
                        : account.status === 'Inactif'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {account.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {account.status !== 'Actif' && (
                      <button
                        onClick={() => handleStatusChange(account.id, 'Actif')}
                        className="text-green-600 hover:text-green-900"
                        title="Activer le compte"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    {account.status !== 'Inactif' && (
                      <button
                        onClick={() => handleStatusChange(account.id, 'Inactif')}
                        className="text-red-600 hover:text-red-900"
                        title="Désactiver le compte"
                      >
                        <XCircle size={20} />
                      </button>
                    )}
                    {account.status !== 'Suspendu' && (
                      <button
                        onClick={() => handleStatusChange(account.id, 'Suspendu')}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Suspendre le compte"
                      >
                        <AlertCircle size={20} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistiques des comptes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {accounts.filter(a => a.status === 'Actif').length}
              </h4>
              <p className="text-gray-500">Comptes Actifs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full p-3 bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {accounts.filter(a => a.status === 'Inactif').length}
              </h4>
              <p className="text-gray-500">Comptes Inactifs</p>
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
                {accounts.filter(a => a.status === 'Suspendu').length}
              </h4>
              <p className="text-gray-500">Comptes Suspendus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;